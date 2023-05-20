'use-client';

import { createContext, ReactNode, useContext } from 'react';
import { IWalletState, useWallet } from '../hooks/useWallet.hook';

export interface IAppContext {
  connectWallet: Function;
  logout: Function;
  state: IWalletState;
  updateWalletState: Function;
}

interface IAppContextProviderPropsType {
  children: ReactNode;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: IAppContextProviderPropsType) => {
  const { connectWallet, logout, walletState, updateWalletState } = useWallet();
  return (
    <AppContext.Provider
      value={{
        state: walletState,
        logout,
        connectWallet,
        updateWalletState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
