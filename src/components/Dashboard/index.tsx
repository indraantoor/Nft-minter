'use-client';

import { IAppContext, useAppContext } from '../../context/AppContext';
import Accounts from '../Accounts/Accounts';
import Balance from '../Balance';
import Button from '../Button';
import MintNftForm from '../MintNftForm';

const Dashboard = () => {
  const { connectWallet, logout, state } = useAppContext() as IAppContext;
  const { isLoggedIn, allAddresses, address } = state;

  return (
    <>
      <div>Home</div>
      <div>Current Address: {address} </div>
      <div>
        <Balance balance={0} />
      </div>
      {!isLoggedIn ? (
        <Button text="Connect Wallet" onClick={connectWallet} />
      ) : (
        <Button text="Disconnect Wallet" onClick={logout} />
      )}
      <Accounts accounts={allAddresses} />
      <MintNftForm />
    </>
  );
};

export default Dashboard;
