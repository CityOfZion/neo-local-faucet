import Neon, { api } from "@cityofzion/neon-js";

import checkAddress from "./../checkAddress";
import faucetStatus from "./../faucetStatus";
import { faucet, neoscanAddress, neoReward, gasReward } from "./../variables";

export default async (req, res) => {
  if (await faucetStatus(neoscanAddress, faucet.address)) {
    if (await checkAddress(req.params.addr)) {
      const intent = api.makeIntent(
        {
          NEO: parseInt(neoReward, 10),
          GAS: parseInt(gasReward, 10)
        },
        req.params.addr
      );

      const config = {
        net: "Faucet",
        address: faucet.address,
        privateKey: faucet.privateKey,
        intents: intent
      };

      try {
        const { response } = await Neon.sendAsset(config);
        res.send(response.txid);
      } catch (e) {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(204);
    }
  } else {
    res.sendStatus(500);
  }
};
