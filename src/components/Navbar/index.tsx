import React from 'react';
import Button from '../Button';
import { IAppContext, useAppContext } from '../../context/AppContext';
import { useMemo } from 'react';
import ToastUtils from '../../utils/toast/toast.utils';
import AppConstants from '../../utils/constants/app.constants';

/**
    Navbar Component
    A component that displays the navigation bar with wallet connection/logout button.
**/

const Navbar = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn, currentChain } = state;

  // Check if the current network is the correct network
  const correctNetwork = useMemo(() => {
    return currentChain === AppConstants.BSCTChainID;
  }, [currentChain]);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h2 className="text-white text-lg font-semibold">NFT Minter</h2>
          </div>

          <div className="flex items-center">
            {!isLoggedIn ? (
              <Button
                text="Connect Wallet"
                onClick={() => {
                  if (currentChain && !correctNetwork) {
                    ToastUtils.showErrorToast(
                      'Make sure you are connected to right network'
                    );
                    return;
                  }
                  connectWallet();
                }}
              />
            ) : (
              <Button text="Disconnect Wallet" onClick={logout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
