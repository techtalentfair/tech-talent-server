const Sib = require("sib-api-v3-sdk");
const pug = require("pug");
const dotenv = require("dotenv");
const { htmlToText } = require("html-to-text");

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

class Email {
  constructor() {
    this.sender = {
      email: process.env.EMAIL_USER,
      name: 'Tech Talent'
    };
    this.transaction = new Sib.TransactionalEmailsApi();
  }

  async sendResetPasswordEmail(recepient, subject, data) {

    const html = pug.renderFile(`${__dirname}/../views/email/${TEMPLATES.RESET_PASS}.pug`, {
      name: data.name,
      url: data.url,
      subject
    });

    const receivers = [
      {
        email: recepient
      }
    ];

    await this.transaction.sendTransacEmail({
      sender: this.sender,
      to: receivers,
      subject,
      textContent: htmlToText(html),
      htmlContent: html
    });
  }
}

const TEMPLATES = {
  RESET_PASS: 'password_reset'
};

const SMTP = new Email();

module.exports = SMTP;