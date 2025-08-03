import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  usdAmount: { type: Number, required: true },
  cryptoAmount: { type: Number, required: true },
  currency: { type: String, enum: ["btc", "eth"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const cashoutSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  multiplier: { type: Number, required: true },
  cryptoPayout: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const gameRoundSchema = new mongoose.Schema(
  {
    roundId: { type: String, required: true, unique: true },
    startTime: { type: Date, default: Date.now },
    crashPoint: { type: Number, required: true },
    seed: { type: String, required: true }, // used for provably fair algo
    bets: [betSchema],
    cashouts: [cashoutSchema],
  },
  { timestamps: true }
);

export default mongoose.model("GameRound", gameRoundSchema);
