const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

describe("B42Token", function () {
  let owner;
  let token;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const Token  = await ethers.getContractFactory("B42Token");
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should check name", async function () {
    expect(await token.name()).to.equal("Bios42");
  });

  it("Should check symbol", async function () {
    expect(await token.symbol()).to.equal("B42");
  });

});