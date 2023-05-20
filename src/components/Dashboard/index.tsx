'use-client';

import { IAppContext, useAppContext } from '../../context/AppContext';
import Balance from '../Balance';
import MintNftForm from '../MintNftForm';
import MintedNfts from '../MintedNfts';
import Navbar from '../Navbar';

const Dashboard = () => {
  const { state } = useAppContext() as IAppContext;
  const { address, balance } = state;

  return (
    <>
      <div className="text-center">
        <div className="mt-6">
          <span className="mr-2 font-[700]">Address:</span>
          <span className="font-[300]">{address}</span>
        </div>
        <div className="mt-3">
          <Balance balance={balance} />
        </div>
      </div>

      <MintNftForm />
      <MintedNfts />
    </>
  );
};

export default Dashboard;
