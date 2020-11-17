var crypto = require("crypto");
var promisify = require("util").promisify;
var UserModel = require("../models/user");
var emailService = require("./emailService");
var emailConfig = require("../config/config").Mailing;
var mailContent = require("../config/config").Contents.mailVerification;
var validator = require("../validators/functionalities/valuesValidator")()
  .internValidator;

module.exports = class userService {
  constructor() {}

  setUpActivationKey = async (user) => {
    let expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    let activationKey = await promisify(crypto.randomBytes)(128);
    user.activationCode = activationKey.toString("hex");
    user.expirationDate = expirationDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  };

  async signup(user) {
    return await new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let emailServ = new emailService();
        let emailTransporter = emailServ.createTransporter();

        await this.setUpActivationKey(user);
        let userId = await userModel.createUser(user);
        if (!validator("email", emailConfig.mailUserName)) {
          console.error("Error : Configuration Email is Invalide");
          reject({ message: "Internal Server Error.", status: 500 });
        }

        emailServ.sendMail(
          emailTransporter,
          emailConfig.mailUserName,
          user.email,
          mailContent.subject,
          mailContent.contentText,
          mailContent.contentHtml(user.userName, mailContent.link + `/${user.activationCode}`)
        );
        resolve(userId);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
};
