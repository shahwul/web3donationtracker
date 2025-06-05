const hre = require("hardhat");

const currentTimestamp = Math.floor(Date.now() / 1000); // waktu sekarang (dalam detik)
const unlockTime = currentTimestamp + 5 * 60; // + 5 menit

async function main() {
  const Donation = await hre.ethers.getContractFactory("Donation");
  const donation = await Donation.deploy(unlockTime);

  await donation.waitForDeployment();

  console.log("Donation deployed to:", donation.target);

  const Oracle = await hre.ethers.getContractFactory("Oracle");
  const oracle = await Oracle.deploy();

  await oracle.waitForDeployment();

  console.log("Oracle deployed to:", oracle.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
