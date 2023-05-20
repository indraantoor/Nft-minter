'use-client';

import { useState } from 'react';
import { IAppContext, useAppContext } from '../../context/AppContext';
import Accounts from '../Accounts/Accounts';
import { useContract } from '../../hooks/useContract.hook';

const Dashboard = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn, allAddresses, address, balance } = state;
  const [totalMinted, setTotalMinted] = useState(0);

  const contract = useContract();

  const getCount = async () => {
    const count = await contract.count();
    const parsedCount = parseInt(count);
    setTotalMinted(parsedCount);
  };

  return (
    <>
      <div>Home</div>
      <div>Current Address: {address} </div>
      <div onClick={() => getCount()}>Mint Count: {totalMinted}</div>
      <div>Balance: {balance ? balance + ' BNB' : ''}</div>
      {!isLoggedIn ? (
        <button
          className="rounded-full bg-gradient-to-r from-darkPink to-lightPink p-2 text-sm text-white"
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="rounded-full bg-gradient-to-r from-darkPink to-lightPink p-2 text-sm text-white"
          onClick={() => logout()}
        >
          Disconnect Wallet
        </button>
      )}
      <Accounts accounts={allAddresses} />
    </>
  );
};

export default Dashboard;
