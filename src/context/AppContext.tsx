'use-client';

import { createContext, ReactNode, useContext } from 'react';
import { IWalletState, useWallet } from '../hooks/useWallet.hook';

export interface IAppContext {
  connectWallet: Function;
  logout: Function;
  state: IWalletState;
}

interface IAppContextProviderPropsType {
  children: ReactNode;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: IAppContextProviderPropsType) => {
  const { connectWallet, logout, walletState } = useWallet();
  return (
    <AppContext.Provider
      value={{
        state: walletState,
        logout,
        connectWallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
