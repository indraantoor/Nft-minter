import axios from 'axios';
const key = 'c03f26444ea9d3b10fe4';
const secret =
  '366d179386003634b99337857f5cd5381d428699906cbf49dc67e85ce7c3cf79';

export const pinJSONToIPFS = async (JSONBody: any) => {
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
