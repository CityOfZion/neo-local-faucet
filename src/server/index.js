import "@babel/polyfill";

import express from "express";

process.env.isServer = true;

import { home, generate, updateFaucet, requestFaucet } from "./endpoints";
import { port, faucetSite } from "./variables";

const server = express();

server.use("/assets", express.static("assets"));

server.get("/", home);

server.get("/update", updateFaucet);

server.get("/generate", generate);

server.get("/request/:addr", requestFaucet);

server.listen(port);
console.log(`Serving at ${faucetSite}`);
