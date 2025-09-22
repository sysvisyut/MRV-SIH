const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Token = await hre.ethers.getContractFactory("CarbonCreditToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  console.log("CarbonCreditToken:", await token.getAddress());

  const Registry = await hre.ethers.getContractFactory("ProjectRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();
  console.log("ProjectRegistry:", await registry.getAddress());

  const price = hre.ethers.parseEther("0.1");
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(await token.getAddress(), price);
  await marketplace.waitForDeployment();
  console.log("Marketplace:", await marketplace.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});