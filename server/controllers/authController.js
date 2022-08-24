import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import sendgridMail from "@sendgrid/mail";

//declare sendgrid API KEY
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

// const signup = asyncHandler(async (req, res) => {
//   // console.log("REQ BODY ON SIGN UP", req.body);

//   let { name, email, password } = req.body;

//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: "Email is taken",
//       });
//     }
//   });

//   let newUser = new User({ name, email, password });

//   newUser.save((err, success) => {
//     if (err) {
//       console.log("SIGNUP ERROR", err);
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json({
//       message: "Signup success! Please signin!",
//     });
//   });
// });

const signup = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already taken, Kindly use another email.",
      });
    }

    let token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "30m" }
    );

    let emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `<h1>Please use the following link to activate your account</h1>
      <p>${process.env.CLIENT_URL}</p>
      <hr />
      <p>This email may contain sensitive information.</p>
      <p>${process.env.CLIENT_URL}</p>
      `,
    };

    sendgridMail.send(emailData).then((sent) => {
      console.log("SIGNUP EMAIL SENT", sent);

      return res.json({
        message: `Email has been sent to ${email}. Please follow the instruction to activate your account.`,
      });
    });
  });
});

export { signup };
