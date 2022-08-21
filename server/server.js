import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

//import routes
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

//app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
//app.use(cors()); //allow all origings
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

//connect to database
connectDB();

//middlewares
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `API is running at port ${port} - $${process.env.NODE_ENV}`.bgCyan.underline
  );
});
