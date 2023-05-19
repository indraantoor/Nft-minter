export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return { accounts: addressArray, status: 'ok' };
    } catch (err) {
      return { accounts: [], status: 'failed' };
    }
  } else {
    return { status: 'error' };
  }
};
