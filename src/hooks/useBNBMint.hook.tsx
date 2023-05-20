import { useContract } from './useContract.hook';
import { IAppContext, useAppContext } from '../context/AppContext';
import { pinJSONToIPFS } from '../utils/pinata.utils';
import { ethers } from 'ethers';

export interface IMetadata {
  name: string;
  url: string;
  description: string;
}

export interface IToken {
  metadata?: IMetadata;
  tokenId: number;
  tokenURI: string;
}

export const useBNBMint = () => {
  const contract = useContract();
  const { state } = useAppContext() as IAppContext;
  const { address } = state;

  const getCount = async () => {
    const count = await contract?.count();
    const parsedCount = parseInt(count);
    return parsedCount;
  };

  const getMintedStatus = async (tokenURI: IMetadata) => {
    const isMinted = await contract?.isContentOwned(tokenURI);
    return isMinted;
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

    const result = await contract?.payToMint(address, tokenURI, {
      value: ethers.utils.parseEther('0.005'),
    });

    await result.wait();

    getCount();

    return tokenURI;
  };

  return { getCount, getMintedStatus, mintNFT };
};
