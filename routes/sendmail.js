const nodemailer = require("nodemailer");

const sendMail = (info) => {
  const mail = info.email;
  const content = info.content;
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "http://localhost:4000",
      service: "gmail",
      port: 465,
      auth: {
        user: "aayushthaps975@gmail.com",
        pass: "xxbkudibldtaftiq",
      },
    });
    let mailOptions = {
      from: info.email,
      to: mail,
      subject: "Message from client",
      text: content,
    };
    transporter.sendMail(mailOptions, function (error, result) {
      if (error) {
        console.error("dfdfdf");
        reject(error);
      } else {
        resolve({ result });
      }
    });
  });
};

module.exports = sendMail;
