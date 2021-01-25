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
        refreshToken,
        resetPasswordToken,
        resetPasswordExpirationDate,
        locationId,
        ...user
      } = await userModel.getUserByAttribute("userName", payload.userName);
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };



  var checkAccessTokenSockets = async (socket, next) => {
    try {
      if (!socket.handshake.auth.token)
        next({ message: "unauthorized.", status: 401 });
      let token = socket.handshake.auth.token.split(" ")[1] || null;
      let jwtVerification = promisify(jwt.verify);


      if (!await jwtVerification(token, config.accessKeySecret))
        next({ message: "unauthorized.", status: 401 });
      
      let userModel = new UserModel();
      let payload = jwt.decode(token);
      let {
        password,
        activationCode,
        expirationDate,
        active,
        refreshToken,
        resetPasswordToken,
        resetPasswordExpirationDate,
        locationId,
        ...user
      } = await userModel.getUserByAttribute("userName", payload.userName);
      socket['user'] = user;
      next();
    } catch (err) {
      next(err);
    }
  };


  var generateAccessToken = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!refreshToken) throw { message: "unauthorized", status: 401 };

        let jwtVerification = promisify(jwt.verify);
        await jwtVerification(refreshToken, config.refreshKeySecret);

        let userModel = new UserModel();
        let tokenData = jwt.decode(refreshToken);
        let user = await userModel.getUserByAttribute(
          "userName",
          tokenData.userName
        );
        if (user.refreshToken !== refreshToken)
          throw { message: "unauthorized", status: 401 };

        let newAccessToken = jwt.sign(
          { userName: user.userName },
          config.accessKeySecret,
          { expiresIn: config.accessTokenExpiration }
        );
        resolve({ accessToken: newAccessToken });
      } catch (err) {
        if (err.message === 'jwt expired')
          err.status = 401;
        reject(err);
      }
    });
  };

  return {
    checkAccessToken: checkAccessToken,
    generateAccessToken: generateAccessToken,
    checkAccessTokenSockets: checkAccessTokenSockets
  };
};
