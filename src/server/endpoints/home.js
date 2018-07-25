import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { get } from 'axios';

import App from './../../components/App/index';
import Html from './../../components/Html';
import faucetStatus from './../faucetStatus';
import {
  faucet, neoscanAddress, gasReward, neoReward, minBlocks, faucetSite
} from './../variables';

export default async (req, res) => {
  const sheet = new ServerStyleSheet();

  const status = await faucetStatus(neoscanAddress, faucet.address);
  const { data: { height } } = await get(`${neoscanAddress}/v1/get_height`);
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
  const title = 'neo-local faucet';

  res.send(Html({ body, styles, title, preloadedState: config }));
};
