import { useCallback, useEffect, useState } from 'react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { handleWalletConnection } from '../utils/wallet.utils';
import LocalStorageUtils from '../utils/storage/localStorage/localStorage.utls';
import LocalStorageConstants from '../utils/storage/localStorage/localStorageConstants';

export interface IWalletState {
  address: string;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isLoggedIn: boolean;
  allAddresses: string[];
}

export const useWallet = () => {
  const initialState = {
    address: '',
    currentChain: null,
    signer: null,
    provider: null,
    isLoggedIn: false,
    allAddresses: [],
  };

  const [walletState, setWalletState] = useState<IWalletState>(initialState);

  const connectWallet = useCallback(handleWalletConnection, [walletState]);

  const logout = () => {
    setWalletState(initialState);
    LocalStorageUtils.removeFromLocalStorage(
      LocalStorageConstants.IS_LOGGED_IN
    );
  };

  useEffect(() => {
    if (window == null) return;

    if (
      LocalStorageUtils.localStorageHasKey(LocalStorageConstants.IS_LOGGED_IN)
    ) {
      connectWallet(walletState.isLoggedIn, walletState);
    }
  }, [connectWallet, walletState.isLoggedIn, walletState]);

  useEffect(() => {
    if (typeof window.ethereum == 'undefined') return;

    window.ethereum.on('accountsChanged', (userAccounts: string[]) => {
      setWalletState({ ...walletState, address: userAccounts[0] });
    });

    window.ethereum.on('networkChanged', (network: string) => {
      setWalletState({ ...walletState, currentChain: Number(network) });
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
  }, [walletState]);

  return {
    connectWallet,
    logout,
    walletState,
  };
};
