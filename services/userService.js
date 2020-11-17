var crypto = require("crypto");
var promisify = require("util").promisify;
var userModel = require("../models/user");
var emailService = require("./emailService");
var emailConfig = require("../config/config").Mailing;
var mailContent = require("../config/config").Contents.mailVerification;
var validator = require("../validators/functionalities/valuesValidator")()
  .internValidator;

module.exports = class userService {
  constructor() {}

  async signup(user) {
    return await new Promise(async (resolve, reject) => {
      try {
        let randomBytesAsync = promisify(crypto.randomBytes);
        let key = await randomBytesAsync(128);
        user.activationCode = key.toString('hex');
        user.expirationDate = Date.now() + (24 * 60 * 60 * 1000);
        console.log(user.expirationDate);
        let userId = await new userModel().createUser(user);
        let emailServ = new emailService();
        let emailTransporter = emailServ.createTransporter();
        if (!validator("email", emailConfig.mailUserName)) {
          console.error("Error : Configuration Email is Invalide");
          reject({ message: "Internal Server Error." });
        }
        // let emailResponse = await emailServ.sendMail(
        //   emailTransporter,
        //   emailConfig.mailUserName,
        //   user.email,
        //   mailContent.subject,
        //   mailContent.contentText,
        //   mailContent.contentHtml(user.userName, mailContent.link)
        // );

        // if (emailResponse.accepted.includes(user.email))
        //     resolve(userId);
        // else
        //   reject({message: "Email address is unreachable"})
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
};
