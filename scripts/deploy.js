const { ethers } = require("hardhat");
const fs = require("fs");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
const utils = ethers.utils;

// comandline: npx hardhat run scripts/deploy.js --network sepolia
// comandline: npx hardhat verify --network sepolia

const NFTFilePath = "./deployment/nft.json";
const TokenFilePath = "./deployment/token.json";
const MarketPlaceFilePath = "./deployment/MarketPlaceFile.json";
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const balanceBefore = await deployer.getBalance();
  console.log(
    "Account balance before deployment:",
    utils.formatEther(balanceBefore)
  );

  // deploy token
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token address: ", token.address);
  var dataSave = {
    token: token.address,
  };
  fs.writeFileSync(TokenFilePath, JSON.stringify(dataSave));
  // delay 15 seconds
  await new Promise((r) => setTimeout(r, 15000));

  // deploy nft
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT address: ", nft.address);
  var dataSave = {
    nft: nft.address,
  };
  fs.writeFileSync(NFTFilePath, JSON.stringify(dataSave));
  // delay 15 seconds
  await new Promise((r) => setTimeout(r, 15000));

  // deploy marketplace
  const MarketPlace = await ethers.getContractFactory("NFTMarketplace");
  const marketPlace = await MarketPlace.deploy(nft.address, token.address);
  await marketPlace.deployed();
  console.log("Marketplace address: ", marketPlace.address);
  var dataSave = {
    marketPlace: marketPlace.address,
  };
  fs.writeFileSync(MarketPlaceFilePath, JSON.stringify(dataSave));
  console.log("Deployment completed. Data saved to respective JSON files.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
