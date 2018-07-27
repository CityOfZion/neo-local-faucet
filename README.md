<p align="center">
  <img
    src="http://res.cloudinary.com/vidsy/image/upload/v1503160820/CoZ_Icon_DARKBLUE_200x178px_oq0gxm.png"
    width="150px"
    alt="City of Zion logo">
</p>

<h1 align="center">neo-local-faucet</h1>

<p align="center">
  A lightweight faucet for neo-local
</p>

<p align="center">
  <a href="https://github.com/CityOfZion/neo-local-faucet/tags">
    <img src="https://img.shields.io/github/tag/CityOfZion/neo-local-faucet.svg">
  </a>
  <a href="https://travis-ci.org/CityOfZion/neo-local-faucet">
    <img src="https://img.shields.io/travis/CityOfZion/neo-local-faucet/master.svg">
  </a>
  <a href="https://github.com/CityOfZion/neo-local-faucet/commits/master">
    <img src="https://img.shields.io/github/last-commit/CityOfZion/neo-local-faucet.svg">
  </a>
</p>

## What?
This is a faucet for neo-local. It's made with Node and React and uses your local neo-scan to determine and distribute rewards.
Everything is setup to be extremely configurable, for more info check the Configurable environment variables below.

## Features
* Request NEO/GAS for an existing address
* Generate a new account (WIF and address will be displayed) and fill it with NEO/GAS
* Automatic GAS claims for the faucet account

## Configurable environment variables
* `NEOSCAN` is the address of your neo-local NEOSCAN instance. Defaults to `localhost:4000` which is the standard neo-scan URL in neo-local
* `MIN_BLOCK` is the minimum amount of blocks that need to have passed before reapplying. Defaults to `5000` blocks
* `FAUCET_WIF` is the WIF of the Faucet account. The standard value is `KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr`, which holds all NEO and GAS in the neo-privatenet image
* `FAUCET_ADDRESS` is the domain where the faucet is located. Defaults to `localhost`
* `PORT` is the port where the faucet is located. Defaults to `4002`
* `NEO_REWARD` is the amount of NEO the faucet rewards. Defaults to `100`
* `GAS_REWARD` is the amount of GAS the faucet rewards. Defaults to `2000`
