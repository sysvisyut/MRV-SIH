const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BlueCarbon", function () {
  async function deployAll() {
    const [deployer, buyer, projectOwner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("CarbonCreditToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    const Registry = await ethers.getContractFactory("ProjectRegistry");
    const registry = await Registry.deploy();
    await registry.waitForDeployment();

    const price = ethers.parseEther("0.1");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy(await token.getAddress(), price);
    await marketplace.waitForDeployment();

    return { deployer, buyer, projectOwner, token, registry, marketplace, price };
  }

  it("mints by owner and transfers to marketplace for sale", async () => {
    const { deployer, token, marketplace } = await deployAll();
    await token.mint(deployer.address, 1000n);
    expect(await token.balanceOf(deployer.address)).to.equal(1000n);

    await token.transfer(await marketplace.getAddress(), 500n);
    expect(await token.balanceOf(await marketplace.getAddress())).to.equal(500n);
  });

  it("registers a project and reads it back", async () => {
    const { registry, projectOwner } = await deployAll();
    const tx = await registry.connect(projectOwner).registerProject("Mangrove A", "Blue carbon restoration", 1000);
    const receipt = await tx.wait();
    const projectId = receipt.logs.length ? 0 : 0; // first project is 0

    const [name, description, owner, total, minted] = await registry.getProject(projectId);
    expect(name).to.equal("Mangrove A");
    expect(description).to.equal("Blue carbon restoration");
    expect(owner).to.equal(projectOwner.address);
    expect(total).to.equal(1000n);
    expect(minted).to.equal(0n);
  });

  it("allows buying credits and updates balances", async () => {
    const { deployer, buyer, token, marketplace, price } = await deployAll();
    await token.mint(deployer.address, 1000n);
    await token.transfer(await marketplace.getAddress(), 200n);

    const amount = 10n;
    const cost = price * amount;
    await expect(
      marketplace.connect(buyer).buyCredits(amount, { value: cost })
    ).to.emit(marketplace, "Purchased").withArgs(buyer.address, amount, cost);

    expect(await token.balanceOf(buyer.address)).to.equal(amount);
  });
});