// models/Player.js
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  btc: { type: Number, default: 0 },
  eth: { type: Number, default: 0 },
});

const playerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    wallet: { type: walletSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model("Player", playerSchema);
