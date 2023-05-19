import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MY NFT', function () {
  it('Should mint and transer an NFT To Someone', async function () {
    const BNBMint = await ethers.getContractFactory('BNBMint');
    const bnbmint: any = await BNBMint.deploy();
    await bnbmint.deployed();

    const recipient = '';
    const metadataURI = 'cid/test.png';

    let balance = await bnbmint.balanceOf(recipient);
    expect(balance).to.equal(0);
    const newlyMintedToken = await bnbmint.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.001'),
    });
  });
});
