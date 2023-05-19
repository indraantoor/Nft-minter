import { ethers } from 'hardhat';

async function main() {
  const BNBMint = await ethers.getContractFactory('BNBMint');
  const bnbmint = await BNBMint.deploy();
  await bnbmint.deployed();

  console.log('Deployed to ', bnbmint.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
