require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Check if private key is valid (must be 0x + 64 hex characters = 66 chars, or 64 hex chars)
const isValidKey = (key) => key && (key.length === 64 || key.length === 66);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_URL || "",
      accounts: isValidKey(PRIVATE_KEY) ? [PRIVATE_KEY] : [],
    },
  },
};
