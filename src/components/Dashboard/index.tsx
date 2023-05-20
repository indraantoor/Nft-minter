'use-client';

import { IAppContext, useAppContext } from '../../context/AppContext';
import Accounts from '../Accounts/Accounts';
import Button from '../Button';

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
        <Button text="Connect Wallet" onClick={connectWallet} />
      ) : (
        <Button text="Disconnect Wallet" onClick={logout} />
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
