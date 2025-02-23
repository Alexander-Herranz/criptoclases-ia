import { BaseContract, ContractFactory } from "ethers";
import "@nomicfoundation/hardhat-verify";

import hre from "hardhat";
import fs from "fs";

const contractsToDeploy: string[] = [
  "ERC20MintableAndBurnable",
  //"ERC721MintableAndBurnable",
  //"ERC721AudioGuides",
  //"PoAPRegistry",
  //"ERC721PoAP",
  //"ERC721WithStructData"
]

const addresses: {[key: string]: string} = {};

function storeAddressInfo(contractName: string, address: string) {
  addresses[contractName] = address;
}

function saveAddressInfo(network: string) {
  fs.writeFileSync(`addresses-${network}.json`, JSON.stringify(addresses));
}

async function main() {
  for (const contractName of contractsToDeploy) {
    const factory: ContractFactory = await hre.ethers.getContractFactory(contractName);
    const params: string | undefined = process.env[`${contractName}_CONSTRUCTOR_PARAMS`] || "[]";
    const paramsParsed: string[] = JSON.parse(params);

    console.log(`Deploying contract ${contractName} with parameters: ${params}...`);
    const deployResponse: BaseContract = await factory.deploy(...paramsParsed, {
      gasPrice: 20_000_000_000,
      gasLimit: 1_000_000,  
    });
    console.log(`Contract ${contractName} deployed successfully!`);
    storeAddressInfo(contractName, await deployResponse.getAddress());


    /*
    await hre.run("verify:verify", {
      address: await deployResponse.getAddress(),
      constructorArguments: ["NFT Name", "$NFT"],
    });

    //Verify accounts
    //npx hardhat verify --network polygonAmoy 0x4464D4acD00771820C4Ee98df730cf34aAfcDb60 "NFT Name" "$NFT"    

    console.log(`Contract verification was successful! ` + await deployResponse.getAddress());
    */



  }

  console.log(`Saving contract addresses for ${hre.network.name}`);
  saveAddressInfo(hre.network.name);
  console.log(`Addresses saved! Deploy successful!`);
}

main();
