import React from 'react';
import Button from '../Button';
import { IAppContext, useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn } = state;

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h2 className="text-white text-lg font-semibold">NFT Minter</h2>
          </div>

          <div className="flex items-center">
            {!isLoggedIn ? (
              <Button text="Connect Wallet" onClick={connectWallet} />
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
