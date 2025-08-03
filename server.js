import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
const PORT = 1011;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
