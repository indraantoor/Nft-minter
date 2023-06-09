import { ethers } from 'ethers';
import { useMemo } from 'react';
import { IAppContext, useAppContext } from '../context/AppContext';
import BNBMint from '../artifacts/contracts/BNBMint.sol/BNBMint.json';
import AppConstants from '../utils/constants/app.constants';

const contractAddress = AppConstants.ContractAddress;

/**
    Custom hook for accessing the BNBMint contract instance.
    @returns {Object} - The contract instance.
**/
export const useContract = () => {
  const { state } = useAppContext() as IAppContext;
  const { signer } = state;
  return useMemo(
    () => signer && new ethers.Contract(contractAddress, BNBMint.abi, signer),
    [signer]
  );
};
