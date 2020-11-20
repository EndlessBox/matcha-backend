require("dotenv").config();

module.exports = {
  serverPort: process.env.SERVER_PORT || 3000,
  serverHost: process.env.SERVER_HOST,
  nodeEnv: process.env.NODE_ENV || "developement",
  hashRounds: process.env.HASHROUNDS || 10,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  refreshKeySecret: process.env.REFRESH_KEY_SECRET,
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
      contentHtml: (userName, link) => `<h3>Hello ${userName}</h3>, <p>Please click the following link to activate your account :\n\t<a href="${link}">Verification Link</a></p>`,
      link: "http://localhost:4200/verifyEmail"
    }
  }
};
