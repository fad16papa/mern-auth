import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import sendgridMail from "@sendgrid/mail";
import { sendEmailWithNodeMailer } from "../helpers/email.js";

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
        error: "Email is taken",
      });
    }

    let token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    let emailData = {
      from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>http://localhost:3000/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>http://localhost:3000</p>
            `,
    };

    sendEmailWithNodeMailer(req, res, emailData);
  });
});

const accountActivation = asyncHandler(async (req, res) => {
  let { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVIATION ERROR", err);
          return res.status(401).json({
            message: "Expired link. Signup Again!",
          });
        }

        let { name, email, password } = jwt.decode(token);

        let user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              message: "ERROR SAVING USER IN DATABASE, TRY SIGNUP AGAIN!",
            });
          }

          return res.json({
            message: "SIGNUP SUCCESS. PLEASE LOGIN!",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "SOMETHING WENT WRONG TRY!",
    });
  }
});

export { signup, accountActivation };
