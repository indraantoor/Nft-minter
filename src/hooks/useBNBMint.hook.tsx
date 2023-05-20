import { useContract } from './useContract.hook';
import { IAppContext, useAppContext } from '../context/AppContext';
import { pinJSONToIPFS } from '../utils/pinata.utils';
import { ethers } from 'ethers';

export interface IMetadata {
  name: string;
  url: string;
  description: string;
}

export const useBNBMint = () => {
  const contract = useContract();
  const { state } = useAppContext() as IAppContext;
  const { address } = state;

  const getCount = async () => {
    const count = await contract.count();
    const parsedCount = parseInt(count);
    return parsedCount;
  };

  const getMintedStatus = async (tokenURI: IMetadata) => {
    const isMinted = await contract.isContentOwned(tokenURI);
    return isMinted;
  };

  const getTokens = async () => {
    const balance = await contract.balanceOf(address);
    const balanceFormatted = Number(balance);
    const tokens = [];
    for (let i = 0; i < balanceFormatted; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i);
      const tokenURI = await contract.tokenURI(tokenId);
      tokens.push({ tokenId: Number(tokenId), tokenURI });
    }

    tokens.forEach(async (token: any) => {
      const metadataRes = await fetch(token.tokenURI.substring(7));
      const metadata = await metadataRes.json();
      token.metadata = metadata;
    });

    return tokens;
  };

  const mintNFT = async ({ url, name, description }: IMetadata) => {
    //error handling
    if (url.trim() == '' || name.trim() == '' || description.trim() == '') {
      return {
        success: false,
        status: 'Please make sure all fields are completed before minting.',
      };
    }

    //make metadata
    const metadata = new Object() as IMetadata;
    metadata.name = name;
    metadata.url = url;
    metadata.description = description;

    //make pinata call
    const pinataResponse: any = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      return {
        success: false,
        status: 'Something went wrong while uploading your tokenURI.',
      };
    }

    const tokenURI = pinataResponse.pinataUrl;

    const result = await contract.payToMint(address, tokenURI, {
      value: ethers.utils.parseEther('0.005'),
    });

    await result.wait();

    getCount();

    return tokenURI;
  };

  return { getCount, getMintedStatus, mintNFT, getTokens };
};
