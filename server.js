import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import betRoutes from "./routes/betRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { initGameService } from "./services/gameService.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/api/v1/bet", betRoutes);

initGameService(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
