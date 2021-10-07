
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");

describe("Escrow", function () {
  let admin, buyer, buyer2, merchant;
  let escrow;
  let b42Token;
  const onehundred = ethers.utils.parseEther("100");

  let initial_buyer_balance, initial_merchant_balance, initial_escrow_balance;

  beforeEach(async function () {
    [admin, buyer, merchant, buyer2, merchant2] = await ethers.getSigners();
    const B42Token  = await ethers.getContractFactory("B42Token");
    b42Token = await B42Token.deploy();
    await b42Token.deployed();

    await b42Token.mint(buyer.address, onehundred);
    await b42Token.mint(buyer2.address, onehundred);

    const Escrow  = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(b42Token.address);
    await escrow.deployed();

    initial_buyer_balance = await b42Token.balanceOf(buyer.address);
    initial_merchant_balance = await b42Token.balanceOf(merchant.address);
    initial_buyer2_balance = await b42Token.balanceOf(buyer2.address);
    initial_merchant2_balance = await b42Token.balanceOf(merchant2.address);
    initial_escrow_balance = await b42Token.balanceOf(escrow.address);

  });

  describe("lock", function() {
    it("should withdraw the buyers tokens", async function() {
        await b42Token.connect(buyer).approve(escrow.address, onehundred);
        await escrow.connect(buyer).lock(merchant.address, onehundred);

        expect(await b42Token.balanceOf(buyer.address)).to.equal(initial_buyer_balance - onehundred);
        expect(await b42Token.balanceOf(escrow.address)).to.equal(initial_escrow_balance + onehundred);
    });

    // check that the amout of tokens is enough
    // check that the spending limit of tokens is enough

  })

  describe("claim", function() {
    it("transfer the funds after being approved transaction", async function () {    
        await b42Token.connect(buyer).approve(escrow.address, onehundred);
        await escrow.connect(buyer).lock(merchant.address, onehundred);
        await escrow.connect(buyer).release(merchant.address, onehundred);
        await escrow.connect(merchant).claim(onehundred);
    
        expect(await b42Token.balanceOf(buyer.address)).to.equal(initial_buyer_balance - onehundred);
        expect(await b42Token.balanceOf(merchant.address)).to.equal(initial_merchant_balance + onehundred);
      });
    
      it("should not release before buyer's approval", async function () {
        await b42Token.connect(buyer).approve(escrow.address, onehundred);
        await escrow.connect(buyer).lock(merchant.address, onehundred);
        await escrow.connect(merchant).claim(onehundred);
    
        expect(await b42Token.balanceOf(buyer.address)).to.equal(initial_buyer_balance - onehundred);
        expect(await b42Token.balanceOf(merchant.address)).to.equal(initial_merchant_balance);
      });
      // Should check allowed amount
      // Should chech the sender

  })

 
 });
