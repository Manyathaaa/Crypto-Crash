import crypto from "crypto";
import GameRound from "./models/GameRound.js";

let currentRound = null;
let io = null;
let roundNumber = 0;

export const initGameService = (socketServer) => {
  io = socketServer;
  startNextRound();
};

const startNextRound = async () => {
  roundNumber++;
  const seed = crypto.randomBytes(16).toString("hex");
  const crashPoint = generateCrashPoint(seed, roundNumber);

  currentRound = {
    roundId: `round_${roundNumber}`,
    seed,
    crashPoint,
    multiplier: 1,
    isCrashed: false,
  };

  // Broadcast round start
  io.emit("round_started", {
    roundId: currentRound.roundId,
    seed,
  });

  const roundDoc = new GameRound({
    roundId: currentRound.roundId,
    seed,
    crashPoint,
    bets: [],
    cashouts: [],
  });

  await roundDoc.save();

  let multiplier = 1;
  const growthRate = 0.02;

  const interval = setInterval(async () => {
    if (multiplier >= crashPoint) {
      clearInterval(interval);
      currentRound.isCrashed = true;
      io.emit("round_crash", { crashPoint });

      // Start next round after 5 seconds
      setTimeout(() => startNextRound(), 5000);
      return;
    }

    multiplier += multiplier * growthRate;
    currentRound.multiplier = Number(multiplier.toFixed(2));

    io.emit("multiplier_update", {
      multiplier: currentRound.multiplier,
    });
  }, 100);
};

const generateCrashPoint = (seed, roundNumber) => {
  const hash = crypto
    .createHash("sha256")
    .update(seed + roundNumber)
    .digest("hex");
  const intVal = parseInt(hash.slice(0, 8), 16);
  const maxCrash = 120;
  const crashPoint = (intVal % (maxCrash * 100)) / 100;
  return Math.max(1.01, crashPoint); // Ensure minimum 1.01x
};

export const getCurrentRound = () => currentRound;
export const hasCrashed = () => currentRound?.isCrashed;
export const getMultiplier = () => currentRound?.multiplier || 1;
