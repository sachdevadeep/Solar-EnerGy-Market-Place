const { ethers } = require("hardhat");

async function main() {
  const SolarEnergy = await ethers.getContractFactory("SolarEnergy");
  const solar = await SolarEnergy.deploy();

  await solar.waitForDeployment();

  console.log("Contract deployed to:", await solar.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
