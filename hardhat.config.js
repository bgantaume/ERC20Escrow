require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  settings: {
    outputSelection: {
      "*": {
          "*": ["storageLayout"],
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    // polygon: {
    //   url:"https://polygon-rpc.com/",
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  }
};
