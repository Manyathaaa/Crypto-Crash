import express from "express";
import dotenv from "dotenv";

const app = express();

const PORT = 1011;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
