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
  <a href="https://github.com/be-neo/neo-local-faucet/tags">
    <img src="https://img.shields.io/github/tag/be-neo/neo-local-faucet.svg">
  </a>
  <a href="https://github.com/be-neo/neo-local-faucet/commits/master">
    <img src="https://img.shields.io/github/last-commit/be-neo/neo-local-faucet.svg">
  </a>
</p>

## What?
Node faucet for neo-local. Uses your local Neoscan to determine and distribute rewards.

## Features
* Request NEO/GAS for an existing address
* Generate a new account (WIF and address will be displayed) and fill it with NEO/GAS
* Automatic GAS claims for the faucet account

## Configurable environment variables
* `NEOSCAN` The address of your neo-local NEOSCAN instance. The standard value is `localhost:4000`.
* `MIN_BLOCK` the minimum amount of blocks that need to have passed before reapplying. The standard value is `5000`.
* `FAUCET_WIF` the WIF of the Faucet account. The standard value is `KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr`.
* `FAUCET_ADDRESS` the domain where the faucet is located. The standard value is `localhost`.
* `PORT` the port where the faucet is located. The standard value is `4002`.
* `NEO_REWARD` the amount of NEO the faucet rewards. The standard value is `100`.
* `GAS_REWARD` the amount of GAS the faucet rewards. The standard value is `2000`.
