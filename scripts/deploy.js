const hre = require("hardhat");

async function main() {
    console.log("Deploying SentimentOracle to Base...");

  const Oracle = await hre.ethers.getContractFactory("SentimentOracle");
    const oracle = await Oracle.deploy();
    await oracle.waitForDeployment();

  const address = await oracle.getAddress();
    console.log("SentimentOracle deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
