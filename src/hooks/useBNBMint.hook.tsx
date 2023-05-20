import { useContract } from './useContract.hook';
import { IAppContext, useAppContext } from '../context/AppContext';
import { pinJSONToIPFS } from '../utils/pinata.utils';
import { ethers } from 'ethers';
import ToastUtils from '../utils/toast/toast.utils';

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

/**
    Custom hook for interacting with the BNBMint contract and performing minting operations.
    @returns {Object} - An object containing various functions related to the BNBMint contract.
**/

export const useBNBMint = () => {
  const contract = useContract();
  const { state } = useAppContext() as IAppContext;
  const { address } = state;

  /**
    Retrieves the count of minted NFTs from the contract.
    @returns {Promise<number | undefined>} - A promise that resolves to the count of minted NFTs, or undefined if an error occurs.
  **/
  const getCount = async () => {
    try {
      const count = await contract?.count();
      const parsedCount = parseInt(count);
      return parsedCount;
    } catch {
      ToastUtils.showErrorToast(
        'Failed to get count, please try again after some time'
      );
      return;
    }
  };

  /**
    Retrieves the minted status of an NFT with the given tokenURI from the contract.
    @param {IMetadata} tokenURI - The tokenURI of the NFT.
    @returns {Promise<boolean | undefined>} - A promise that resolves to the minted status of the NFT, or undefined if an error occurs.
  **/
  const getMintedStatus = async (tokenURI: IMetadata) => {
    try {
      const isMinted = await contract?.isContentOwned(tokenURI);
      return isMinted;
    } catch {
      ToastUtils.showErrorToast(
        'Failed to get minted status, please try again after some time'
      );
      return;
    }
  };

  /**
    Mints an NFT with the provided metadata.
    @param {IMetadata} metadata - The metadata of the NFT.
    @returns {Promise<string | undefined>} - A promise that resolves to the tokenURI of the minted NFT, or undefined if an error occurs.
  **/
  const mintNFT = async ({ url, name, description }: IMetadata) => {
    //error handling
    if (url.trim() == '' || name.trim() == '' || description.trim() == '') {
      ToastUtils.showErrorToast('Please check for missing form values');
      return;
    }

    //make metadata
    const metadata = new Object() as IMetadata;
    metadata.name = name;
    metadata.url = url;
    metadata.description = description;

    //make pinata call
    const pinataResponse: any = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      ToastUtils.showErrorToast(
        'Something went wrong while uploading your tokenURI.'
      );
      return;
    }

    const tokenURI = pinataResponse.pinataUrl;

    try {
      const result = await contract?.payToMint(address, tokenURI, {
        value: ethers.utils.parseEther('0.005'),
      });
      await result.wait();
      getCount();
      ToastUtils.showSuccessToast('Minted successfully');
      return tokenURI;
    } catch {
      ToastUtils.showErrorToast('Transaction failed');
      return;
    }
  };

  return { getCount, getMintedStatus, mintNFT };
};
