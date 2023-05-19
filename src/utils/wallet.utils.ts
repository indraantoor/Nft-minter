import { ethers } from 'ethers';
import { IWalletState } from '../hooks/useWallet.hook';
import LocalStorageUtils from './storage/localStorage/localStorage.utls';
import LocalStorageConstants from './storage/localStorage/localStorageConstants';

export const handleWalletConnection = async (
  isLoggedIn: boolean,
  previousState: IWalletState
) => {
  if (isLoggedIn) return;

  if (!window.ethereum) {
    alert('Install metamask');
    return;
  }

  try {
    const { ethereum } = window;
    const provider = new ethers.providers.JsonRpcProvider(
      'https://data-seed-prebsc-1-s1.binance.org:8545'
    );

    const userAccounts: string[] = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    const hasAccounts = userAccounts.length > 0;

    if (hasAccounts) {
      const signer = await provider.getSigner();
      const currentChain = Number(await (await provider.getNetwork()).chainId);
      const address = userAccounts[0];
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);

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
