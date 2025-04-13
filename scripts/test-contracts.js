const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CEREBRA Contracts", function () {
  let CerebraToken;
  let CerebraNFT;
  let token;
  let nft;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    CerebraToken = await ethers.getContractFactory("CerebraToken");
    CerebraNFT = await ethers.getContractFactory("CerebraNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new CerebraToken contract before each test
    token = await CerebraToken.deploy();
    await token.deployed();

    // Deploy a new CerebraNFT contract before each test
    nft = await CerebraNFT.deploy();
    await nft.deployed();
  });

  describe("CerebraToken", function () {
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        expect(await token.owner()).to.equal(owner.address);
      });

      it("Should assign the total supply of tokens to the owner", async function () {
        const ownerBalance = await token.balanceOf(owner.address);
        expect(await token.totalSupply()).to.equal(ownerBalance);
      });
    });

    describe("Transactions", function () {
      it("Should transfer tokens between accounts", async function () {
        // Transfer 50 tokens from owner to addr1
        await token.transfer(addr1.address, 50);
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);

        // Transfer 50 tokens from addr1 to addr2
        await token.connect(addr1).transfer(addr2.address, 50);
        const addr2Balance = await token.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
      });

      it("Should fail if sender doesn't have enough tokens", async function () {
        // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
        // `require` will evaluate false and revert the transaction.
        await expect(
          token.connect(addr1).transfer(owner.address, 1)
        ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      });
    });

    describe("Vesting", function () {
      it("Should create a vesting schedule", async function () {
        const amount = 1000;
        const duration = 365 * 24 * 60 * 60; // 1 year in seconds
        
        await token.createVestingSchedule(addr1.address, amount, duration, false);
        
        const schedule = await token.getVestingSchedule(addr1.address);
        expect(schedule.totalAmount).to.equal(amount);
        expect(schedule.duration).to.equal(duration);
        expect(schedule.revocable).to.equal(false);
      });

      it("Should release vested tokens", async function () {
        const amount = 1000;
        const duration = 365 * 24 * 60 * 60; // 1 year in seconds
        
        await token.createVestingSchedule(addr1.address, amount, duration, false);
        
        // Fast forward time by 6 months
        await ethers.provider.send("evm_increaseTime", [180 * 24 * 60 * 60]);
        await ethers.provider.send("evm_mine");
        
        await token.connect(addr1).release();
        const balance = await token.balanceOf(addr1.address);
        expect(balance).to.be.closeTo(amount / 2, amount / 100); // Allow 1% margin of error
      });
    });
  });

  describe("CerebraNFT", function () {
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        expect(await nft.owner()).to.equal(owner.address);
      });

      it("Should set the right platform fee", async function () {
        expect(await nft.platformFee()).to.equal(500); // 5%
      });
    });

    describe("Minting", function () {
      it("Should mint a new NFT", async function () {
        const tokenURI = "ipfs://QmExample";
        await nft.mint(addr1.address, tokenURI);
        
        expect(await nft.ownerOf(1)).to.equal(addr1.address);
        expect(await nft.tokenURI(1)).to.equal(tokenURI);
      });

      it("Should increment token ID", async function () {
        const tokenURI1 = "ipfs://QmExample1";
        const tokenURI2 = "ipfs://QmExample2";
        
        await nft.mint(addr1.address, tokenURI1);
        await nft.mint(addr2.address, tokenURI2);
        
        expect(await nft.ownerOf(1)).to.equal(addr1.address);
        expect(await nft.ownerOf(2)).to.equal(addr2.address);
      });
    });

    describe("Platform Fee", function () {
      it("Should allow owner to update platform fee", async function () {
        await nft.updatePlatformFee(300); // 3%
        expect(await nft.platformFee()).to.equal(300);
      });

      it("Should not allow non-owner to update platform fee", async function () {
        await expect(
          nft.connect(addr1).updatePlatformFee(300)
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("Should not allow platform fee to exceed 10%", async function () {
        await expect(
          nft.updatePlatformFee(1100) // 11%
        ).to.be.revertedWith("Platform fee cannot exceed 10%");
      });
    });
  });
}); 