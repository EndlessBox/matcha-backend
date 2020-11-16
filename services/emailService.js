const nodemailer = require("nodemailer");
var value;

module.exports = class mailService {
  constructor(host, port, userName, password) {
    this.host = host;
    this.port = port;
    this.userName = userName;
    this.password = password;
    console.log(this);
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
      subject: subject,
      text: text || null,
      html: html || null,
    });
  }
};
