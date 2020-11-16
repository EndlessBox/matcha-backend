var userModel = require("../models/user");
var emailService = require("./emailService");
var emailConfig = require("../config/config").Mailing;

module.exports = class userService {
  constructor() {}

  async signup(user) {
    return await new Promise(async (resolve, reject) => {
      try {
        let userId = await new userModel().createUser(user);
        let emailServ = new emailService(
          emailConfig.mailHost,
          emailConfig.mailPort,
          emailConfig.mailUserName,
          emailConfig.mailPassword
        );
        let emailTransporter = emailServ.createTransporter();
        console.log(
          await emailServ.sendMail(
            emailTransporter,
            emailConfig.mailUserName,
            user.email,
            "test",
            "teeeeeessssttt",
            null
          )
        );
        resolve(userId);
      } catch (err) {
        reject(err);
      }
    });
  }
};
