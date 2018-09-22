import Neon, { api, wallet } from "@cityofzion/neon-js";

import faucetStatus from "./../faucetStatus";
import { faucet, neoscanAddress, neoReward, gasReward } from "./../variables";

export default async (_, res) => {
  if (await faucetStatus(neoscanAddress, faucet.address)) {
    const acc = new wallet.Account("");
    const intent = api.makeIntent(
      {
        NEO: parseInt(neoReward, 10),
        GAS: parseInt(gasReward, 10)
      },
      acc.address
    );

    const config = {
      net: "Faucet",
      address: faucet.address,
      privateKey: faucet.privateKey,
      intents: intent
    };

    try {
      const { response } = await Neon.sendAsset(config);
      res.send({
        tx: response.txid,
        wif: acc.WIF,
        generatedAddress: acc.address
      });
    } catch (e) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(500);
  }
};
