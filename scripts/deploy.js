const hre = require("hardhat");

async function main() {
  console.log("Deploying CEREBRA contracts...");

  // Deploy CerebraToken
  console.log("Deploying CerebraToken...");
  const CerebraToken = await hre.ethers.getContractFactory("CerebraToken");
  const cerebraToken = await CerebraToken.deploy();
  await cerebraToken.waitForDeployment();
  const cerebraTokenAddress = await cerebraToken.getAddress();
  console.log(`CerebraToken deployed to: ${cerebraTokenAddress}`);

  // Deploy CerebraNFT
  console.log("Deploying CerebraNFT...");
  const CerebraNFT = await hre.ethers.getContractFactory("CerebraNFT");
  const cerebraNFT = await CerebraNFT.deploy();
  await cerebraNFT.waitForDeployment();
  const cerebraNFTAddress = await cerebraNFT.getAddress();
  console.log(`CerebraNFT deployed to: ${cerebraNFTAddress}`);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await cerebraToken.deployTransaction.wait(5);
  await cerebraNFT.deployTransaction.wait(5);

  // Verify contracts on Etherscan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Verifying contracts on Etherscan...");
    
    try {
      await hre.run("verify:verify", {
        address: cerebraTokenAddress,
        constructorArguments: [],
      });
      console.log("CerebraToken verified on Etherscan");
    } catch (error) {
      console.error("Error verifying CerebraToken:", error);
    }
    
    try {
      await hre.run("verify:verify", {
        address: cerebraNFTAddress,
        constructorArguments: [],
      });
      console.log("CerebraNFT verified on Etherscan");
    } catch (error) {
      console.error("Error verifying CerebraNFT:", error);
    }
  }

  console.log("Deployment completed successfully!");
  console.log("Contract addresses:");
  console.log(`CerebraToken: ${cerebraTokenAddress}`);
  console.log(`CerebraNFT: ${cerebraNFTAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 