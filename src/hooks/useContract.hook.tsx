import { ethers } from 'ethers';
import { useMemo } from 'react';
import { IAppContext, useAppContext } from '../context/AppContext';
import BNBMint from '../artifacts/contracts/BNBMint.sol/BNBMint.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const useContract = () => {
  const { state } = useAppContext() as IAppContext;
  const { signer } = state;
  return useMemo(
    () => signer && new ethers.Contract(contractAddress, BNBMint.abi, signer),
    [signer]
  );
};
