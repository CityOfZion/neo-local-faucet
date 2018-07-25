import Neon from '@cityofzion/neon-js';
import { get } from 'axios';

import { faucet, minBlocks, neoscanAddress } from './variables';

const checkAddress = async address => {
  if (Neon.is.address(address) && address !== faucet.address) {
    const { data: { height } } = await get(`${neoscanAddress}/v1/get_height`);
    const maxBlock = height - minBlocks;
    let page = 0;
    let currentIteratedBlock = height;
    let found = false;

    // check if found before maxBlock
    while (!found && currentIteratedBlock > maxBlock) {
      const { data } = await get(`${neoscanAddress}/v1/get_last_transactions_by_address/${faucet.address}/${page}`);
      data.forEach(tx => {
        if (!found && currentIteratedBlock > maxBlock && tx.type === "ContractTransaction") {
          let faucetVin = false;
          let addressVout = false;

          // Iterate vin for faucet address
          tx.vin.forEach(txVin => {
            if (!faucetVin) faucetVin = txVin.address_hash === faucet.address;
            // console.log('addressVin', txVin.address_hash, faucet.address, txVin.address_hash === faucet.address)
          });

          // Iterate vout for requested address
          tx.vouts.forEach(txVout => {
            if (!addressVout) addressVout = txVout.address_hash === address;
            // console.log('addressVout', txVout.address_hash, address, txVout.address_hash === address)
          });

          found = faucetVin && addressVout;
          currentIteratedBlock = tx.block_height;
          // console.log(found, currentIteratedBlock, currentIteratedBlock > maxBlock);
        }
      });
      page += 1;
    }

    return !found;
  } else {
    return false;
  }
};

export default checkAddress;
