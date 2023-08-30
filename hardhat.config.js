/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("chai");
require("ethers");
require("ethereum-waffle");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [process.env.REAL_ACCOUNTS],
    },
    base: {
      url: `https://base-goerli.blockpi.network/v1/rpc/public`,
      accounts: [process.env.REAL_ACCOUNTS],
    },
    bsc: {
      url: `https://bsc-testnet.publicnode.com`,
      accounts: [process.env.REAL_ACCOUNTS],
    },
  },
  mocha: {
    timeout: 6000000,
  },
  libraries: {
    BaseXNFTLibrary: {
      path: "./contracts/BaseXNFTLibrary.sol",
      address: "0x7Ad44152E59dbc21a2Fb9589d1bc3194699c4659",
    },
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "SZVKP8YHJF5DPMSNMD9ZY3ZN9KN97IWYXA",
  },

  solidity: {
    compilers: [
      {
        version: "0.5.7",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.8.18",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.4.18",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
