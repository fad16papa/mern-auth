const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//import routes
const authRoutes = require("./routes/auth.js");

//middlewares
app.use("/api", authRoutes);

//app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
//app.use(cors()); //allow all origings
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

//connect to database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error => ", err));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running at port ${port} - $${process.env.NODE_ENV}`);
});
