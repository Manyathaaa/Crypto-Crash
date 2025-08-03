import mongoose from "mongoose";

const betSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    roundId: {
      type: String,
      required: true,
    },
    usdAmount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    cryptoAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["btc", "eth"],
      required: true,
    },
    placedAt: {
      type: Date,
      default: Date.now,
    },
    priceAtTime: {
      type: Number,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bet", betSchema);
