import express from "express";
import { signup, accountActivation } from "../controllers/authController.js";
import { userSignUpValidator } from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

router.post("/signup", userSignUpValidator, runValidation, signup);
router.post("/account-activation", accountActivation);

export default router;
