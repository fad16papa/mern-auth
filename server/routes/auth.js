import express from "express";
const router = express.Router();

import { signup } from "../controllers/authController.js";

router.get("/signup", signup);

export default router;
