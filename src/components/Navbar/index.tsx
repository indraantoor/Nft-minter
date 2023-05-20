import React from 'react';
import Button from '../Button';
import { IAppContext, useAppContext } from '../../context/AppContext';
import { useMemo } from 'react';
import ToastUtils from '../../utils/toast/toast.utils';

const BSCTChainID = 97;

const Navbar = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn, currentChain } = state;

  const correctNetwork = useMemo(() => {
    return currentChain === BSCTChainID;
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
                  if (!correctNetwork) {
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
