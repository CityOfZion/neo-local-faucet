import { get } from "axios";

import faucetStatus from "./../faucetStatus";
import { faucet, neoscanAddress } from "./../variables";

export default async (_, res) => {
  const status = await faucetStatus(neoscanAddress, faucet.address);
  const {
    data: { height }
  } = await get(`${neoscanAddress}/v1/get_height`);
  res.send({
    faucetStatus: status,
    blockHeight: height
  });
};
