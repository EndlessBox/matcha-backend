var crypto = require("crypto");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var promisify = require("util").promisify;
var UserModel = require("../models/user");
var TagModel = require("../models/tag");
var GenderModel = require("../models/gender");
var genderService = require("./genderService");
var RankModel = require("../models/rank");
var emailService = require("./emailService");
var imageService = require("./imageService");
var sexualOrientationService = require("./sexualOrientationService");
var consultationService = require("./consultationService");
var ConsultationModel = require("../models/consultation");
const config = require("../config/config");
const cacheService = require("./cacheService");
const notificationService = require("./notificationService");
const NotificationModel = require("../models/notification");
var emailConfig = config.Mailing;
var mailContent = config.Contents.mailVerification;
var resetContent = config.Contents.passwordReset;
var fields = require("../validators").properties;
var emmitors = require("../suckit/emmitors/index");

var validator = require("../validators/functionalities/valuesValidator")()
  .internValidator;

module.exports = class userService {
  constructor() {}
  /*
   *  SetUp Expiration Date, and Format it to fit DateTime sql format.
   */
  setUpActivationKey = async (offset) => {
    let expirationDate = new Date(Date.now() + offset);
    let activationKey = await promisify(crypto.randomBytes)(128);

    return {
      activationCode: activationKey.toString("hex"),
      expirationDate: expirationDate,
    };
  };

  /*
   *  Setup User Object => set up a safe object accroding to the fields passed.
   *                    => fields represent the value that the routes accepts.
   */

  setUpUserObject = (payload, fields) => {
    let result = {};

    fields.map((field) => {
      if (payload[field]) result[field] = payload[field];
    });
    return result;
  };

  /*
   *  Sign Up : 1 - set up account activation key.
   *            2 - crypte password.
   *            3 - create user Model.
   *            4 - send activation mail.
   */
  async signup(payload) {
    return await new Promise(async (resolve, reject) => {
      var userModel = new UserModel();
      var rankModel = new RankModel();
      var emailServ = new emailService();

      var userId = null;
      var emailTransporter = emailServ.createTransporter();
      var user = this.setUpUserObject(payload, fields.signUpProperties);
      var starterRank = await rankModel.getLimitValues("MIN");

      user["rankId"] = starterRank.id;
      user["experience"] = starterRank.minXp;
      try {
        let activationObject = await this.setUpActivationKey(
          24 * 60 * 60 * 1000
        );
        user.activationCode = activationObject.activationCode;
        user.expirationDate = activationObject.expirationDate;
        user.password = await bcrypt.hash(user.password, config.hashRounds);
        userId = await userModel.createUser(user);
        if (!validator("email", emailConfig.mailUserName)) {
          await userModel.deleteUserAttribute("id", userId);
          console.error("Error : Configuration Email is Invalide");
          reject({ message: "Internal Server Error.", status: 500 });
          return;
        }
        await emailServ.sendMail(
          emailTransporter,
          emailConfig.mailUserName,
          user.email,
          mailContent.subject,
          mailContent.contentText,
          mailContent.contentHtml(
            user.userName,
            mailContent.link(user.activationCode)
          )
        );
        resolve(userId);
      } catch (err) {
        /*
         *  Error Management
         */
        // ------------------Email errors need to move to email Service -----------------------------------
        if (err.errno == -60 && err.code == "ESOCKET" && userId) {
          console.error("Error : Configuration Mail host is Invalide");
          await userModel.deleteUserAttribute("id", userId);
          reject({ message: "Internal Server Error.", status: 500 });
        } else if (err.errno == -3008 && err.code == "EDNS" && userId) {
          console.error("Error : Configuration Mail host is Invalide");
          await userModel.deleteUserAttribute("id", userId);
          reject({ message: "Internal Server Error.", status: 500 });
        } else if (err.responseCode == 535 && err.code == "EAUTH" && userId) {
          console.error("Error : Configuration Email Or Password is Invalide");
          await userModel.deleteUserAttribute("id", userId);
          reject({ message: "Internal Server Error.", status: 500 });
          // ------------------------------------------------------------------------------------------------
        } else if (err.errno == 1062 && err.code == "ER_DUP_ENTRY")
          reject({ message: "Duplicated email or userName", status: 409 });

        if (userId) await userModel.deleteUserAttribute("id", userId);
        reject(err);
      }
    });
  }

  async activateEmail(tokenPayload) {
    return await new Promise(async (resolve, reject) => {
      try {
        var userModel = new UserModel();
        var user = await userModel.getUserByAttribute(
          "activationCode",
          tokenPayload.mailToken
        );
        var nowDate = new Date();
        var expirationDate = new Date(user.expirationDate);
        if (user.active)
          reject({ message: "Account Already Activated.", status: 409 });
        if (nowDate > expirationDate)
          reject({ message: "Token expired.", status: 406 });
        await userModel.updateUserAttribute("active", 1, user.id);
        resolve(true);
      } catch (err) {
        if (err.message == "user not found")
          reject({ message: "Token not found.", status: 406 });
        reject(err);
      }
    });
  }

  async signIn(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let user = await userModel.getUserByAttribute(
          "userName",
          payload.userName
        );
        let authorized = await bcrypt.compare(payload.password, user.password);
        if (!authorized)
          reject({ message: "Incorrect password.", status: 401 });
        if (!user.active)
          reject({ message: "Account not activated.", status: 403 });
        let accessToken = jwt.sign(
          { userName: user.userName },
          config.accessKeySecret,
          { expiresIn: config.accessTokenExpiration }
        );
        let refreshToken = jwt.sign(
          { userName: user.userName },
          config.refreshKeySecret,
          { expiresIn: config.refreshTokenExpiration }
        );
        await userModel.updateUserAttribute(
          "refreshToken",
          refreshToken,
          user.id
        );
        let response = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        resolve(response);
      } catch (error) {
        if (error.message == "user not found")
          reject({ message: "User not found.", status: 404 });
        reject(error);
      }
    });
  }

  async forgotPassword(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let user = await userModel.getUserByAttribute(
          "userName",
          payload.userName
        );
        if (!user) throw { message: "user not found", status: 404 };
        if (user.email !== payload.email)
          throw {
            message: "Email sent don't belong to the given userName",
            status: 403,
          };

        let emailServ = new emailService();
        let emailTransporter = emailServ.createTransporter();
        let resetObject = await this.setUpActivationKey(15 * 60 * 1000);

        await userModel.updateUserAttribute(
          "resetPasswordToken",
          resetObject.activationCode,
          user.id
        );
        await userModel.updateUserAttribute(
          "resetPasswordExpirationDate",
          resetObject.expirationDate,
          user.id
        );

        await emailServ.sendMail(
          emailTransporter,
          emailConfig.mailUserName,
          user.email,
          resetContent.subject,
          resetContent.contentText,
          resetContent.contentHtml(
            user.userName,
            resetContent.link(resetObject.activationCode)
          )
        );
        resolve({
          message:
            "Reset password email sent succefully, please check your email",
          status: 200,
        });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  async updatePassword(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        if (payload.password !== payload.retryPassword)
          throw { message: "passwords dont match", status: 400 };
        let userModel = new UserModel();
        let user = await userModel.getUserByAttribute(
          "resetPasswordToken",
          payload.passwordToken
        );

        if (!user) throw { message: "unauthorized.", status: 401 };

        let expirationDate = new Date(user.resetPasswordExpirationDate);

        if (Date.now() > expirationDate)
          throw { message: "Token expired.", status: 401 };
        if (payload.passwordToken !== user.resetPasswordToken)
          throw { message: "Token Doesn't match, unauthorized.", status: 401 };

        let newPassword = await bcrypt.hash(
          payload.password,
          config.hashRounds
        );

        await userModel.updateUserAttribute("password", newPassword, user.id);
        await this.logout(user.userName);
        resolve({ message: "Password updated succefully", status: 200 });
      } catch (err) {
        reject(err);
      }
    });
  }

  logout(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let user = await userModel.getUserByAttribute(
          "userName",
          payload.userName
        );
        if (!user) throw { message: "user Not found", status: 404 };
        await userModel.updateUserAttribute("refreshToken", null, user.id);
        resolve({ message: "logged out succefully.", status: 200 });
      } catch (err) {
        reject(err);
      }
    });
  }

  async manageTags(userData, user) {
    let tagModel = new TagModel();

    if (typeof userData.tags === "string") userData.tags = [userData.tags];
    userData.tags.map(async (tag) => {
      try {
        let { resultId, offset } = await tagModel.createTag([tag]);
        if (offset === 0) {
          let result = await tagModel.getTagByAttribute("tag", tag);
          if (result.id !== 0) await tagModel.tag_user(result.id, user.id);
        } else await tagModel.tag_user(resultId, user.id);
      } catch (err) {
        if (err.code === "ER_DUP_ENTRY")
          console.log(
            new Date().toLocaleDateString(),
            err.sqlMessage,
            "-- UserName: " + user.userName
          );
        else throw err;
      }
    });
    delete userData.tags;
  }

  async manageGender(userData, user) {
    let genderModel = new GenderModel();
    let userModel = new UserModel();
    let gender = userData.gender;

    let result = await genderModel.getGenderByAttribute("gender", gender);
    if (!result) throw "Invalide gender.";
    await userModel.updateUserAttribute("genderId", result.id, user.id);
    delete userData.gender;
  }

  async updateUser(payload, user, images = null) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let imageServ = new imageService();
        let sexualOrientationServ = new sexualOrientationService();

        let userData = this.setUpUserObject(payload, fields.updateUser);

        if (userData.tags) await this.manageTags(userData, user);

        if (images || userData.profilePictureName !== null) await imageServ.manageImages(images, user.id, userData.profilePictureName);
        delete userData.profilePictureName

        if (userData.gender) await this.manageGender(userData, user);

        if (userData.orientation || !user.orientationId)
          await sexualOrientationServ.manageOrientation(userData, user);

        if (userData.password && userData.password !== userData.retryPassword)
          reject({ message: "password's doesnt match.", status: 400 });
        else if (
          userData.password &&
          userData.password === userData.retryPassword
        ) {
          delete userData.retryPassword;
          userData.password = await bcrypt.hash(
            userData.password,
            config.hashRounds
          );
        }
        if (Object.keys(userData).length)
          await userModel.updateUser(userData, user.id);
        resolve({ message: "user updated succefully", status: 200 });
      } catch (err) {
        if (err === "Invalide gender." || err === "Invalide orientation.") {
          reject({ message: err, status: 400 });
          return;
        }
        if (err) reject(err);
      }
    });
  }

  getUserInfo(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let imageServ = new imageService();
        let orientationServ = new sexualOrientationService();
        let genderServ = new genderService();
        let rankModel = new RankModel();
        let tagModel = new TagModel();

        let userRank = await rankModel.getUserRank(user.id);

        user["images"] = await imageServ.getUserImages(user.id);
        user["orientation"] = await orientationServ.getUserSexualOrientation(
          user.id
        );
        user["gender"] = await genderServ.getUserGender(user.id);
        user["rank"] = userRank.rank;

        user["tags"] = (await tagModel.getUserTags(user.id)).map(
          (elem) => elem.tag
        );

        delete user.orientationId;
        delete user.genderId;
        delete user.id;
        delete user.rankId;
        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  otherUserInfos(searcher, searchedId) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let notificationModel = new NotificationModel();
        let consultationModel = new ConsultationModel();
        let tagModel = new TagModel();
        let imageServ = new imageService();
        let orientationServ = new sexualOrientationService();
        let genderServ = new genderService();
        let consultationServ = new consultationService();
        let notificationServ = new notificationService();
        let rankModel = new RankModel();
        let cacheServ = new cacheService();

        let result = await userModel.getUserByAttribute("id", searchedId);

        if (!result) return reject({ message: "User not found.", status: 404 });

        // CREATE CONSULTATION.

        if (searcher.id != searchedId) {
          let lastConsultation = await consultationModel.getUsersConsultation(
            searcher.id,
            searchedId
          );

          let interval = Date.now() - new Date(lastConsultation?.dateOfConsult);
          if (
            !lastConsultation ||
            (!isNaN(interval) &&
              interval > config.Notifications.consultDelay * 60000)
          ) {
            let { date } = await consultationServ.createConsultation(
              { consulter: searcher.id, consulted: searchedId },
              searcher
            );

            let consultedSocketId = await cacheServ.getUserSocketId(searchedId);

            await notificationModel.createNotificattion(
              notificationServ.createNotificationDbPayload(
                "consult",
                searcher.id,
                searchedId,
                consultedSocketId ? 1 : 0,
                date
              )
            );

            if (consultedSocketId)
              emmitors(
                "notification",
                notificationServ.createNotificationPayload(
                  "consult",
                  searcher,
                  result,
                  date
                ),
                consultedSocketId
              );
          }
        }

        result["tags"] = (await tagModel.getUserTags(searchedId)).map(
          (elem) => elem.tag
        );
        result["images"] = await imageServ.getUserImages(searchedId);
        result["orientation"] = await orientationServ.getUserSexualOrientation(
          searchedId
        );
        result["gender"] = await genderServ.getUserGender(searchedId);
        result["rank"] = (await rankModel.getUserRank(searchedId)).rank;

        delete result.email;
        resolve(this.cleanUserResponse(result));
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  cleanUserResponse(user) {
    delete user.activationCode;
    delete user.active;
    delete user.expirationDate;
    delete user.genderId;
    delete user.locationId;
    delete user.orientationId;
    delete user.password;
    delete user.rankId;
    delete user.refreshToken;
    delete user.resetPasswordExpirationDate;
    delete user.resetPasswordToken;
    return user;
  }
};
