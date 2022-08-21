const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//import routes
const authRoutes = require("./routes/auth.js");
const { connectDB } = "./db.js";

dotenv.config();

const app = express();

//connect to database
connectDB;

//middlewares
app.use("/api", authRoutes);

//app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
//app.use(cors()); //allow all origings
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running at port ${port} - $${process.env.NODE_ENV}`);
});
