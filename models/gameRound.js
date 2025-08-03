import mongoose from "mongoose";

const gameRoundSchema = new mongoose.Schema(
  {
    roundId: { type: String, required: true, unique: true },
    startTime: { type: Date, default: Date.now },
    crashPoint: { type: Number, required: true },
    seed: { type: String, required: true }, // used for provably fair algo
    bet: { type: mongoose.Schema.Types.ObjectId, ref: "Bet", required: true },
    cashOut: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CashOut",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GameRound", gameRoundSchema);
