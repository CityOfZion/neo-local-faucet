import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';
import Html from './client/Html';
import { ServerStyleSheet } from 'styled-components';

const port = 4002;
const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet();

  const body = renderToString(sheet.collectStyles(<App />));
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

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
