'use-client';

import { IAppContext, useAppContext } from '../../context/AppContext';
import Balance from '../Balance';
import MintNftForm from '../MintNftForm';
import MintedNfts from '../MintedNfts';

const Dashboard = () => {
  const { state } = useAppContext() as IAppContext;
  const { address, balance, isLoggedIn } = state;

  return isLoggedIn ? (
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
  ) : (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col gap-5 mt-10 m-10 text-center">
      <h2 className="text-3xl font-[600] mt-5">Hi! Welcome to NFT Minter</h2>
      <p className="text-xl font-[300] mt-5">
        Kindly connect your wallet to start minting
      </p>
    </div>
  );
};

export default Dashboard;
