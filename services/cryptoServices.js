import axios from "axios";

let priceCache = {
  btc: null,
  eth: null,
  timestamp: 0,
};

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

export const getCryptoPrices = async () => {
  const now = Date.now();

  // Use cached prices if within 10 seconds
  if (now - priceCache.timestamp < 10000 && priceCache.btc && priceCache.eth) {
    return {
      btc: priceCache.btc,
      eth: priceCache.eth,
    };
  }

  try {
    const res = await axios.get(COINGECKO_URL);
    const btc = res.data.bitcoin.usd;
    const eth = res.data.ethereum.usd;

    priceCache = {
      btc,
      eth,
      timestamp: now,
    };

    return { btc, eth };
  } catch (error) {
    console.error("Failed to fetch crypto prices:", error.message);
    throw new Error("Price API error");
  }
};

export const convertUsdToCrypto = async (usdAmount, currency) => {
  const prices = await getCryptoPrices();

  if (!prices[currency]) {
    throw new Error("Unsupported currency");
  }

  return usdAmount / prices[currency];
};

export const convertCryptoToUsd = async (cryptoAmount, currency) => {
  const prices = await getCryptoPrices();

  if (!prices[currency]) {
    throw new Error("Unsupported currency");
  }

  return cryptoAmount * prices[currency];
};
