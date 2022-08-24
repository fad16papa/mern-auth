import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const signup = asyncHandler(async (req, res) => {
  console.log("REQ BODY ON SIGN UP", req.body);
  res.json({
    data: "you hit the signup endpoint",
  });
});

export { signup };
