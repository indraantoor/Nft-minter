import { IAppContext, useAppContext } from '../../context/AppContext';
import Accounts from '../Accounts/Accounts';

export const Dashboard = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn, allAddresses, address } = state;

  console.log('MY LOGOUT', isLoggedIn);

  return (
    <>
      <div>Home</div>
      <div>Current Address: {address} </div>
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
