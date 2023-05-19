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
    const provider = new ethers.BrowserProvider(ethereum);

    const userAccounts: string[] = await provider.send(
      'eth_requestAccounts',
      []
    );

    const hasAccounts = userAccounts.length > 0;

    if (hasAccounts) {
      const signer = await provider.getSigner();
      const currentChain = Number(await (await provider.getNetwork()).chainId);

      const updatedWalletState: IWalletState = {
        ...previousState,
        address: userAccounts[0],
        signer,
        currentChain,
        provider,
        isLoggedIn: true,
        allAddresses: userAccounts,
      };

      LocalStorageUtils.saveToLocalStorage(
        LocalStorageConstants.IS_LOGGED_IN,
        'true'
      );
      return updatedWalletState;
    }
  } catch (err) {
    return false;
  }
};
