import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    usdAmount: { type: Number, required: true },
    cryptoAmount: { type: Number, required: true },
    currency: { type: String, enum: ["btc", "eth"], required: true },
    type: { type: String, enum: ["bet", "cashout"], required: true },
    transactionHash: { type: String, required: true },
    priceAtTime: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
