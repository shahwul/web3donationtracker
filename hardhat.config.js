require("@nomicfoundation/hardhat-toolbox");
require("hardhat-abi-exporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: "https://ethereum-holesky.publicnode.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 17000,
    }
  },
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: true
  }
};
