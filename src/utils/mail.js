const nodemailer = require("nodemailer");
// const { ApiError } = require("./apiError.js");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(options) {
  try {
    await transporter.sendMail({
      from: "jayashysaini7361@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.content,
    });
  } catch (error) {
    console.error("Error sending mail", error);
  }
}

module.exports = { sendMail };
