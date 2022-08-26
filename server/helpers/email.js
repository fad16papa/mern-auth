import nodeMailer from "nodemailer";

const sendEmailWithNodeMailer = (req, res, emailData) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "fad16papa@gmail.com",
      pass: "vrfljdzxlicqigvm",
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message send: ${info.response}`);
      return res.json({
        message: `Email has been sent to your email. Follow the instruction to activate your account.`,
      });
    })
    .catch((err) => console.log(`Problem sending email: ${err}`));
};

export { sendEmailWithNodeMailer };
