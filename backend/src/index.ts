import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", (req, res) => {});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("listening on port 9000");
  app.listen(9000);
});
