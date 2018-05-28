const neoReward = process.env.NEO_REWARD || 100;
const gasReward = process.env.GAS_REWARD || 2000;

const faucetStatus = balance => {
  let neoStatus = false;
  let gasStatus = false;
  balance.forEach(b => {
    if (b.asset === 'NEO') neoStatus = b.amount >= neoReward
    if (b.asset === 'GAS') gasStatus = b.amount >= gasReward
  });

  return neoStatus && gasStatus;
};

export default faucetStatus;
