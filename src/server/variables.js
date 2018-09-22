import { wallet, rpc, settings } from "@cityofzion/neon-js";

export const neoscan = process.env.NEOSCAN || "localhost:4000";
console.log(`Connecting to the following neo-scan image: ${neoscan}`);
export const minBlocks = process.env.MIN_BLOCK || 5000;
export const faucet = new wallet.Account(
  process.env.FAUCET_WIF ||
    "KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr"
);

export const faucetAddress = process.env.FAUCET_ADDRESS || "localhost";
export const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4020;
export const neoReward = process.env.NEO_REWARD || 100;
export const gasReward = process.env.GAS_REWARD || 2000;
export const underRewardAmount = process.env.UNDER_REWARD_AMOUNT
  ? process.env.UNDER_REWARD_AMOUNT === "true"
  : true;

export const neoscanAddress = `http://${neoscan}/api/main_net`;
export const faucetSite = `http://${faucetAddress}:${port}`;

const faucetConfig = {
  name: "Faucet",
  extra: {
    neoscan: neoscanAddress
  }
};

settings.addNetwork(new rpc.Network(faucetConfig));
