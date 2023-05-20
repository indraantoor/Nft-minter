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
      <div>Mint Count:</div>
      <div>Is Minted</div>
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
      <h2>Mint Form</h2>
      <div className="Minter">
        <button id="walletButton" onClick={() => {}}>
          {address.length > 0 ? (
            'Connected: ' +
            String(address).substring(0, 6) +
            '...' +
            String(address).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>

        <br></br>
        <h1 id="title">NFT Minter</h1>
        <p>
          Simply add your {`asset's`} link, name, and description, then press
          {`"Mint."`}
        </p>
        <form>
          <h2> Link to asset: </h2>
          <input
            type="text"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            // onChange={(event) => setURL(event.target.value)}
          />
          <h2> Name: </h2>
          <input
            type="text"
            placeholder="e.g. My first NFT!"
            // onChange={(event) => setName(event.target.value)}
          />
          <h2> Description: </h2>
          <input
            type="text"
            placeholder="e.g. Even cooler than cryptokitties ;)"
            // onChange={(event) => setDescription(event.target.value)}
          />
        </form>
        <button id="mintButton">Mint NFT</button>
      </div>
    </>
  );
};

export default Dashboard;
