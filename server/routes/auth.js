import express from "express";
import { signup } from "../controllers/authController.js";
import { userSignUpValidator } from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

router.post("/signup", userSignUpValidator, runValidation, signup);

export default router;
