import React from 'react';

interface IAccounts {
  accounts: string[];
}

const Accounts = ({ accounts }: IAccounts) => {
  return (
    <>
      <div>Accounts</div>
      <ul>
        {accounts.length > 0
          ? accounts.map((account) => <li key={account}>{account}</li>)
          : 'No Accounts Found'}
      </ul>
    </>
  );
};

export default Accounts;
