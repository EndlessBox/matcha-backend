const nodemailer = require("nodemailer");
var emailConfig = require("../config/config").Mailing;

module.exports = class mailService {
  constructor() {
    this.host =  emailConfig.mailHost;
    this.port = emailConfig.mailPort;
    this.userName = emailConfig.mailUserName;
    this.password = emailConfig.mailPassword;
  }

  createTransporter() {
    let transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      auth: {
        user: this.userName,
        pass: this.password,
      },
    });
    return transporter;
  }

  async sendMail(transporter, from, to, subject, text, html) {
    return await transporter.sendMail({
      from: from,
      to: to,
      subject: subject || null,
      text: text || null,
      html: html || null,
    });
  }
};
