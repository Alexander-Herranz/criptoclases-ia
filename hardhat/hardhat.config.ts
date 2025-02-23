
import { HardhatUserConfig } from "hardhat/config";

import { ethers } from "ethers";
import "hardhat-deploy";

import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@typechain/hardhat";
import dotenvx from "@dotenvx/dotenvx";

dotenvx.config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // Version of the EVM to compile for.
      // Affects type checking and code generation. Can be homestead,
      // tangerineWhistle, spuriousDragon, byzantium, constantinople,
      // petersburg, istanbul, berlin, london, paris, shanghai or cancun (default)
      evmVersion: "berlin",
    },
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  namedAccounts: {
    //deployer: process.env.NETWORK_WALLET_PRIV_KEY,
  },
  networks: {
    ronin: {
      chainId: 2020,
      url: "https://site1.moralis-nodes.com/ronin/896417610e6d4294b095ededd5d82405",//"https://lb.drpc.org/ogrpc?network=ronin&dkey=ApCkvKn1aEtZnAGqBDG2h01w87uV3ckR76Wmqi5fk9AX", //"https://ronin-mainnet.core.chainstack.com/a0d8f07efce1b95b653276750a6ee294",//https://ronin-mainnet.g.alchemy.com/v2/GzMV277jxq6SNeuvk3yWNCqdGv5ObHgN",//"https://site2.moralis-nodes.com/ronin/896417610e6d4294b095ededd5d82405",,//"https://api.roninchain.com/rpc",
      gasPrice: 20_000_000_000, 
      gasLimit: 1_000_000_000,  
      //maxFeePerGas: ethers.parseUnits("20", "gwei"),  // Establece el máximo que estás dispuesto a pagar
      //maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"), // Prioridad de la transacción
      accounts: process.env.NETWORK_WALLET_PRIV_KEY ? [process.env.NETWORK_WALLET_PRIV_KEY] : [] //[process.env.NETWORK_WALLET_PRIV_KEY]
    },
    saigon: {
      chainId: 2021,
      url: "https://saigon-testnet.roninchain.com/rpc",
      gasPrice: 20_000_000_000, //ethers.parseUnits("20", "gwei").toString(),
      accounts: process.env.NETWORK_WALLET_PRIV_KEY ? [process.env.NETWORK_WALLET_PRIV_KEY] : [] //process.env.NETWORK_WALLET_PRIV_KEY]
    }
    /*
    redB: {
      url: process.env.NETWORK_URL_ALASTRIA_B,
      accounts: [process.env.NETWORK_WALLET_PRIV_KEY]
    },
    polygonAmoy:{
      url: process.env.NETWORK_URL_POL_AMOY,
      accounts: [process.env.NETWORK_WALLET_PRIV_KEY]
    }
    */
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {polygonAmoy: process.env.POLYGONSCAN_API_KEY}
  },
  sourcify: {
    enabled: true,
  },
  typechain: {
    outDir: "typechain-types",  // Directorio donde se generarán los tipos
    target: "ethers-v6",        // Target para ethers.js v5
  },
  networksConfig: {
    ronin: {
      initialBaseFeePerGas: "0", // Elimina el cap en el gas fee
    },
  }
};
