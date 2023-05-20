import { ethers } from 'ethers';
import { IWalletState } from '../hooks/useWallet.hook';
import LocalStorageUtils from './storage/localStorage/localStorage.utls';
import LocalStorageConstants from './storage/localStorage/localStorageConstants';

/**
    Handles the wallet connection process.
    @param {boolean} isLoggedIn - Flag indicating if the user is already logged in.
    @param {IWalletState} previousState - Previous wallet state.
    @returns {IWalletState | boolean} - Updated wallet state or false if an error occurs.
**/

export const handleWalletConnection = async (
  isLoggedIn: boolean,
  previousState: IWalletState
) => {
  if (isLoggedIn) return;

  // Check if MetaMask is installed.
  if (!window.ethereum) {
    alert('Install metamask');
    return;
  }

  try {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);

    // Request user accounts from MetaMask.
    const userAccounts: string[] = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    const hasAccounts = userAccounts.length > 0;

    if (hasAccounts) {
      // Get signer, current chain ID, address, balance, and formatted balance.
      const signer = await provider.getSigner();
      const currentChain = Number(await (await provider.getNetwork()).chainId);
      const address = userAccounts[0];
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);

      // Create the updated wallet state object.
      const updatedWalletState: IWalletState = {
        ...previousState,
        address: userAccounts[0],
        signer,
        currentChain,
        provider,
        isLoggedIn: true,
        allAddresses: userAccounts,
        balance: formattedBalance,
      };

      // Save the login status to local storage.
      LocalStorageUtils.saveToLocalStorage(
        LocalStorageConstants.IS_LOGGED_IN,
        'true'
      );
      return updatedWalletState;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
