import express from "express";
import {
  signup,
  accountActivation,
  singin,
} from "../controllers/authController.js";
import {
  userSignUpValidator,
  userSignInValidator,
} from "../validators/auth.js";
import { runValidation } from "../validators/index.js";

const router = express.Router();

router.post("/signup", userSignUpValidator, runValidation, signup);
router.post("/account-activation", accountActivation);
router.post("/signin", userSignInValidator, runValidation, singin);

export default router;
