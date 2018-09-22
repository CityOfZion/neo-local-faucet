import { get } from "axios";
import { api } from "@cityofzion/neon-js";

import { faucet } from "./variables";

const neoReward = process.env.NEO_REWARD || 100;
const gasReward = process.env.GAS_REWARD || 2000;

const faucetStatus = async (neoscanAddress, faucetAddress) => {
  let neoStatus = false;
  let gasStatus = false;

  const { data: balanceData } = await get(
    `${neoscanAddress}/v1/get_balance/${faucetAddress}`
  );
  const balance = balanceData.balance.map(asset => {
    delete asset.unspent;
    return asset;
  });

  balance.forEach(b => {
    if (b.asset === "NEO") {
      neoStatus = b.amount >= neoReward;
      // console.log(b.amount);
    }

    if (b.asset === "GAS") {
      gasStatus = b.amount >= gasReward;
      // console.log(b.amount);
    }
  });

  if (!gasStatus) {
    const config = {
      net: "Faucet",
      address: faucet.address,
      privateKey: faucet.privateKey
    };

    try {
      const {
        response: { result, txid }
      } = await api.claimGas(config, api.neoscan);
      console.log(`[GAS CLAIM ${Date.now()}]: ${result} tx ${txid}`);
    } catch (e) {
      console.log("GAS already claimed.");
    }
  }

  return neoStatus && gasStatus;
};

export default faucetStatus;
