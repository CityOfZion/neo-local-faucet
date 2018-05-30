import '@babel/polyfill';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { get } from 'axios';

import App from './../components/App/index';
import Html from './../components/Html';
import faucetStatus from './faucetStatus';

const server = express();

const neoscan = process.env.NEOSCAN || 'localhost:4000';
const minBlocks = process.env.MIN_BLOCK || 20;
const faucetAddress = process.env.FAUCET_ADDRESS || 'AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y';
const address = process.env.ADDRESS || 'localhost';
const port = process.env.PORT || 4002;
const neoReward = process.env.NEO_REWARD || 100;
const gasReward = process.env.GAS_REWARD || 2000;

const neoscanAddress = `http://${neoscan}/api/main_net/v1`;
const faucetSite = `http://${address}:${port}`;

server.use('/assets', express.static('assets'));

server.get('/', async (req, res) => {
  const sheet = new ServerStyleSheet();

  const status = await faucetStatus(neoscanAddress, faucetAddress);
  const { data: { height } } = await get(`${neoscanAddress}/get_height`);
  const config = {
    gasReward,
    minBlocks,
    neoReward,
    faucetSite,
    blockHeight: height,
    faucetStatus: status
  };

  const body = renderToString(sheet.collectStyles(
    <App config={config} />
  ));

  const styles = sheet.getStyleTags();
  const title = 'NEO faucet';

  res.send(
    Html({
      body,
      styles,
      title,
      preloadedState: config
    })
  );
});

server.get('/check/:addr', (req, res) => {
  console.log(req.params.addr);
  res.sendStatus(200);
});

server.listen(port);
console.log(`Serving at ${faucetSite}`);
