import axios from 'axios';
import AppConstants from './constants/app.constants';

/**
    Pins a JSON object to IPFS using the Pinata API.
    @param {any} JSONBody - The JSON object to be pinned.
    @returns {Promise<{ success: boolean, pinataUrl: string } | { success: boolean, message: string }>} - A promise that resolves to an object with success and pinataUrl properties if successful, or success and message properties if an error occurs.
**/

export const pinJSONToIPFS = async (JSONBody: any) => {
  const key = AppConstants.PINATA_KEY;
  const secret = AppConstants.PINATA_SECRET_KEY;
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
