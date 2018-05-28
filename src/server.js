import '@babel/polyfill';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { get } from 'axios';

import App from './client/App';
import Html from './client/Html';
import faucetStatus from './faucetStatus';

const server = express();

const neoscan = process.env.NEOSCAN || 'localhost';
const neoscanPort = process.env.NEOSCAN_IP || 4000;
const minBlock = process.env.MIN_BLOCK || 20;
const faucetAddress = process.env.FAUCET_ADDRESS || 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y';
const port = process.env.PORT || 4002;
const neoReward = process.env.NEO_REWARD || 100;
const gasReward = process.env.GAS_REWARD || 2000;

server.use('/assets', express.static('assets'));

server.get('/', async (req, res) => {
  const sheet = new ServerStyleSheet();

  const { data: balanceData } = await get(
    `http://${neoscan}:${neoscanPort}/api/main_net/v1/get_balance/${faucetAddress}`
  );

  const balance = balanceData.balance.map(asset => {
    delete asset.unspent;
    return asset;
  });

  const status = faucetStatus(balance);

  const { data: { height } } = await get(
    `http://${neoscan}:${neoscanPort}/api/main_net/v1/get_height`
  );

  const body = renderToString(sheet.collectStyles(
    <App faucetStatus={status} blockHeight={height} />
  ));

  const styles = sheet.getStyleTags();
  const title = 'NEO faucet';

  res.send(
    Html({
      body,
      styles,
      title
    })
  );
});

server.get('/check/:addr', (req, res) => {

});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
