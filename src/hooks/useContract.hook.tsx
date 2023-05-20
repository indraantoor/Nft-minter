import { ethers } from 'ethers';
import { useMemo } from 'react';
import { IAppContext, useAppContext } from '../context/AppContext';
import BNBMint from '../artifacts/contracts/BNBMint.sol/BNBMint.json';

const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';

export const useContract = () => {
  const { state } = useAppContext() as IAppContext;
  const { signer } = state;
  return useMemo(
    () => signer && new ethers.Contract(contractAddress, BNBMint.abi, signer),
    [signer]
  );
};
