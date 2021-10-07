
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

describe("Escrow", function () {
  let admin, buyer, merchant;
  let escrow;
  let b42Token;
  const onehundred = ethers.utils.parseEther("100");

  beforeEach(async function () {
    [admin, buyer, merchant] = await ethers.getSigners();
    const B42Token  = await ethers.getContractFactory("B42Token");
    b42Token = await B42Token.deploy();
    await b42Token.deployed();

    await b42Token.mint(buyer.address, onehundred);

    const Escrow  = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy();
    await escrow.deployed();
  });

  it("Store the token to secure the transaction", async function () {
    initial_buyer_balance = await b42Token.balanceOf(buyer.address);
    initial_merchant_balance = await b42Token.balanceOf(merchant.address);

    await b42Token.connect(buyer).approve(escrow.address, onehundred);
    await escrow.connect(buyer).lock(b42Token.address, onehundred);
    await escrow.connect(buyer).release(b42Token.address, onehundred);
    await escrow.connect(merchant).claim(b42Token.address, onehundred);

    expect(await b42Token.balanceOf(buyer.address)).to.equal(initial_buyer_balance - onehundred);
    expect(await b42Token.balanceOf(merchant.address)).to.equal(initial_merchant_balance + onehundred);
  });

  // check that the amout of tokens is enough
  // check that the spending limit of tokens is enough
});
