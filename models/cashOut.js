import mongoose from "mongoose";

const cashOutSchema = new mongoose.Schema(
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
    multiplier: {
      type: Number,
      required: true,
      min: 1,
    },
    cryptoPayout: {
      type: Number,
      required: true,
    },
    usdEquivalent: {
      type: Number,
      required: true,
    },
    priceAtTime: {
      type: Number,
      required: true,
    },
    cashedOutAt: {
      type: Date,
      default: Date.now,
    },
    transactionHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CashOut =
  mongoose.models.CashOut || mongoose.model("CashOut", cashOutSchema);

export default CashOut;
