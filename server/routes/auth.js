const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/authController.js");

router.get("/signup", signup);

module.exports = router;
