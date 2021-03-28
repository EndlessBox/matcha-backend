require("dotenv").config();

module.exports = {
  serverPort: process.env.SERVER_PORT || 3000,
  serverHost: process.env.SERVER_HOST,

  socketsPort: process.env.SOCKETS_PORT || 3002,

  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT || 6379,

  nodeEnv: process.env.NODE_ENV || "developement",

  hashRounds: process.env.HASHROUNDS || 10,

  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  refreshKeySecret: process.env.REFRESH_KEY_SECRET,
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || "1day", // must be shorter !
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || "1day",

  imagesMaxCount: process.env.IMAGES_MAX_COUNT || 5,
  imagesUploadLocation: process.env.IMAGES_UPLOAD_LOCATION || "../uploads",

  defaultOrientation: process.env.DEFAULT_ORIENTATION || "bisexual",

  defaultUserAreaKm: process.env.DEFAULT_USER_AREA_KM || 1,

  Database: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbConnectionLimit: process.env.DB_CONNECTION_LIMIT,
  },
  Mailing: {
    mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
    mailPort: process.env.MAIL_PORT || 465,
    mailUserName: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
  },
  Contents: {
    mailVerification: {
      subject: "Email Verification",
      // contentText: (userName, link) => `Hello ${userName}, Please click the following link to activate your account :\n\t${link}`,
      contentText: null,
      contentHtml: (userName, link) =>
        `<h3>Hello ${userName},</h3> <p>Please click the following link to activate your account : <a href="${link}">Verification Link</a></p>`,
      link: (activationCode, link, nodeEnv, port) =>
        `${
          nodeEnv === "production" ? "https" : "http"
        }://${link}:${port}/api/mailActivation/${activationCode}`,
    },
    passwordReset: {
      subject: "Password Reset",
      contentText: null,
      contentHtml: (
        userName,
        link
      ) => `<h3>Hello ${userName}</h3>, <p>A Reset password demand was made using your email and userName, please click the following link to reset your password: <a href="${link}">Reset Password Link</a></p>
        <p>If you didn't send any reset request, please ignore this email.</p>`,
      link: (resetCode) => `http://localhost:4200/resetPassword/${resetCode}`,
    },
  },
  Experience: {
    like: 50,
    match: 10,
    dislike: -50,
    block: -100,
    calculate: (update, updaterRankValue) =>
      update ? update + (update * updaterRankValue) / 100 : update,
  },

  DefaultSuggestionsTri: {
    distance: "ASC",
    communTags: "DESC",
  },

  Notifications: {
    consultDelay: 15,
  },
};
