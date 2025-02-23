import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";
import { Signer } from "ethers";
import { PoAPRegistry } from "../typechain-types";  // Tipo generado para el contrato

describe("PoAPRegistry", function () {
  let PoAPRegistry: ContractFactory;
  let poapRegistry: PoAPRegistry;
  let owner: Signer;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    owner = signers[0];  // El primer signer como "owner"
    PoAPRegistry = await ethers.getContractFactory("PoAPRegistry");
    poapRegistry = await PoAPRegistry.deploy() as PoAPRegistry;  // Casting al tipo PoAPRegistry
    await poapRegistry.waitForDeployment();  // En ethers.js v6, se usa `waitForDeployment()`
  });

  it("Should create a new collection and ensure its address is not zero", async function () {
    const city = "New York";
    await poapRegistry.createLocationCollection(city);
    const collectionAddress = await poapRegistry.locationCollection(city);

    expect(collectionAddress).to.not.equal(ethers.ZeroAddress);  // En ethers.js v6, `ethers.ZeroAddress`
  });
});
