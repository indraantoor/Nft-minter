'use-client';

import { IAppContext, useAppContext } from '../../context/AppContext';
import Accounts from '../Accounts/Accounts';

const Dashboard = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn, allAddresses, address, balance } = state;

  return (
    <>
      <div>Home</div>
      <div>Current Address: {address} </div>
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
