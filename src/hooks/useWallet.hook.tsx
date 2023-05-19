'use-client';

import { useCallback, useEffect, useState } from 'react';
import { handleWalletConnection } from '../utils/wallet.utils';
import LocalStorageUtils from '../utils/storage/localStorage/localStorage.utls';
import LocalStorageConstants from '../utils/storage/localStorage/localStorageConstants';

export interface IWalletState {
  address: string;
  currentChain: number | null;
  signer: any | null;
  provider: any | null;
  isLoggedIn: boolean;
  allAddresses: string[];
  balance: string;
}

export const useWallet = () => {
  const initialState = {
    address: '',
    currentChain: null,
    signer: null,
    provider: null,
    isLoggedIn: false,
    allAddresses: [],
    balance: '',
  };

  const [walletState, setWalletState] = useState<IWalletState>(initialState);

  const connectWallet = useCallback(
    async (
      isLoggedIn = walletState.isLoggedIn,
      walletStateParam = walletState
    ) => {
      const walletResponse: IWalletState | boolean | undefined =
        await handleWalletConnection(isLoggedIn, walletStateParam);

      if (walletResponse) {
        setWalletState(walletResponse);
      }
    },
    [walletState]
  );

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
