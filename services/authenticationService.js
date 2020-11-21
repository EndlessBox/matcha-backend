var jwt = require("jsonwebtoken");
var config = require("../config/config");
var promisify = require("util").promisify;
var UserModel = require("../models/user");

module.exports = () => {
  var checkAccessToken = async (req, res, next) => {
    try {
      if (!req.headers.authorization)
        throw { message: "unauthorized.", status: 401 };
      let token = req.headers.authorization.split(" ")[1] || null;
      let jwtVerification = promisify(jwt.verify);

      await jwtVerification(token, config.accessKeySecret);
      let userModel = new UserModel();
      let payload = jwt.decode(token);
      let {
        password,
        activationCode,
        expirationDate,
        active,
        ...user
      } = await userModel.getUserByAttribute("userName", payload.userName);
      req.body.user = user;
      next();
    } catch (err) {
      console.error(err);
      next(err);
    }
  };



  return {checkAccessToken : checkAccessToken};
};
