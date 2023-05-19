import hre from 'hardhat';

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.utils.parseEther('0.001');

  const BNBMint = await hre.ethers.getContractFactory('BNBMint');
  const bnbmint: any = await BNBMint.deploy();

  await bnbmint.deployed();

  console.log('Deployed to ', bnbmint.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
