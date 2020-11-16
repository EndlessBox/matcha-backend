require("dotenv").config();

module.exports = {
  serverPort: process.env.SERVER_PORT || 3000,
  serverHost: process.env.SERVER_HOST,
  nodeEnv: process.env.NODE_ENV || "developement",
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
};
