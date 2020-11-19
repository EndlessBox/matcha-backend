var crypto = require("crypto");
var bcrypt = require("bcrypt");
var promisify = require("util").promisify;
var UserModel = require("../models/user");
var emailService = require("./emailService");
const config = require("../config/config");
const userModel = require("../models/user");
var emailConfig = config.Mailing;
var mailContent = config.Contents.mailVerification;
var validator = require("../validators/functionalities/valuesValidator")()
  .internValidator;

module.exports = class userService {
  constructor() {}
  /*
   *  SetUp Expiration Date, and Format it to fit DateTime sql format.
   */
  setUpActivationKey = async (user) => {
    let expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    let activationKey = await promisify(crypto.randomBytes)(128);
    user.activationCode = activationKey.toString("hex");
    user.expirationDate = expirationDate.toISOString().slice(0, 19);
    // .replace("T", " ");
  };

  /*
   *  Sign Up : 1 - set up account activation key.
                2 - crypte password.
                3 - create user Model.
                4 - send activation mail.
   */
  async signup(user) {
    return await new Promise(async (resolve, reject) => {
      var userModel = new UserModel();
      var userId = null;
      var emailServ = new emailService();
      var emailTransporter = emailServ.createTransporter();

      try {
        await this.setUpActivationKey(user);
        user.password = await bcrypt.hash(user.password, config.hashRounds);
        userId = await userModel.createUser(user);
        if (!validator("email", emailConfig.mailUserName)) {
          console.error("Error : Configuration Email is Invalide");
          reject({ message: "Internal Server Error.", status: 500 });
        }
        await emailServ.sendMail(
          emailTransporter,
          emailConfig.mailUserName,
          user.email,
          mailContent.subject,
          mailContent.contentText,
          mailContent.contentHtml(
            user.userName,
            mailContent.link + `/${user.activationCode}`
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
        } 
        else if (err.errno == -3008 && err.code == "EDNS" && userId) {
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
      
        if (userId)
          await userModel.deleteUserAttribute("id", userId);
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
};
