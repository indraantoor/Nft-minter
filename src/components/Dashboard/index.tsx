import Accounts from '../Accounts/Accounts';

export const Dashboard = () => {
  return (
    <>
      <div>Home</div>
      <button
        className="rounded-full bg-gradient-to-r from-darkPink to-lightPink p-2 text-sm text-white"
        // onClick={handleConnectToWallet}
      >
        Connect To Wallet
      </button>
      <Accounts accounts={[]} />
    </>
  );
};
