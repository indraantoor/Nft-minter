import { useState } from 'react';
import { connectWallet } from '../../utils/wallet.utils';
import Accounts from '../Accounts/Accounts';

export const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');

  const handleConnectToWallet = async () => {
    const walletResponse = await connectWallet();
    if (walletResponse.status == 'ok') {
      const accounts = walletResponse.accounts;
      setAccounts(accounts);
      setSelectedAccount(accounts[0]);
      return;
    } else {
      console.log('ERROR FETCHING ACCOUNTS');
    }
  };

  const isDisabled = selectedAccount ? true : false;

  return (
    <>
      <div>Home</div>
      <button
        className="rounded-full bg-gradient-to-r from-darkPink to-lightPink p-2 text-sm text-white"
        disabled={isDisabled}
        onClick={handleConnectToWallet}
      >
        Connect To Wallet
      </button>
      <Accounts accounts={accounts} />
    </>
  );
};
