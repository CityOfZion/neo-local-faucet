import { get } from 'axios';

const neoReward = process.env.NEO_REWARD || 100;
const gasReward = process.env.GAS_REWARD || 2000;

const faucetStatus = async (neoscanAddress, faucetAddress) => {
  let neoStatus = false;
  let gasStatus = false;

  const { data: balanceData } = await get(`${neoscanAddress}/get_balance/${faucetAddress}`);
  const balance = balanceData.balance.map(asset => {
    delete asset.unspent;
    return asset;
  });

  balance.forEach(b => {
    if (b.asset === 'NEO') neoStatus = b.amount >= neoReward
    if (b.asset === 'GAS') gasStatus = b.amount >= gasReward
  });

  return neoStatus && gasStatus;
};

export default faucetStatus;
