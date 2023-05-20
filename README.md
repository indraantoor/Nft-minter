# Next.js NFT Minting Application

This guide will walk you through the installation, setup, and usage of the application, which allows users to mint NFTs on the Binance Smart Chain Testnet. Please follow the instructions below to get started.

## Table of Contents

1. [Installation](#installation)
2. [Setup](#setup)
3. [Usage](#usage)
   - 3.1 [Connecting Wallet](#connecting-wallet)
   - 3.2 [Minting NFTs](#minting-nfts)
   - 3.3 [Viewing Minted NFTs](#viewing-minted-nfts)
4. [Troubleshooting](#troubleshooting)
5. [FAQ](#faq)

## 1. Installation

To install the Next.js NFT Minting Application, please follow these steps:

1. Clone the repository from GitHub:

2. Navigate to the project directory:

3. Install the dependencies using npm:

```sh
 npm install
```

## 2. Setup

To set up the Next.js NFT Minting Application, please ensure you have the following prerequisites:

- MetaMask wallet extension installed on your browser
- A Binance Smart Chain Testnet wallet with test BNB tokens

Follow these steps to set up the application:

1. Signup for an account on Pianata

```
https://www.pinata.cloud/
```

2. Go to api keys
3. Click generate new key
4. Toggle Admin Keys have access to all endpoints and account settings
5. Click create key
6. Copy the key and the secret key
7. In the project root directory create a

```
.env.development
```

environment variable file for the application to run in dev environment

```
.env.production
```

environment variable file for the application to run in production environment

8. Create 2 Environment variables

```
NEXT_PUBLIC_PINATA_KEY=<PASTE_PINATA_KEY_HERE>
```

```
NEXT_PUBLIC_PINATA_SECRET_KEY=<PASTE_PINATA_SECRET_KEY_HERE>
```

9. Create these 2 environment variables in both the environment files we created before

10. Run CORS Disabled browser by typing this command in terminal

FOR MAC:

```
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

FOR WINDOWS:
Just do follow steps:

Right click on desktop, add new shortcut
Add the target as

```
"[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp
```

Click OK.

11. To start the application locally and run in development mode run this

```
npm run dev
```

(Steps 12 and 13 are to check how it works and behaves when ran in production mode and would be used when we are deploying this application but for now Step 11 will help you run the application locally)

12. To start the application in production environment

First run

```
npm run build
```

13. To start application in production mode
    Then to start the application run this. (To checkout how it works and behaves when ran in production mode)

```
npm run start
```

14. Open your browser and navigate to http://localhost:3000.

Make sure you run your application in the cors disabled browser.

## 3. Usage

### 3.1 Connecting Wallet

To connect your MetaMask wallet to the Binance Smart Chain Testnet, follow these steps:

1. Click on the "Connect Wallet" button in the navbar
2. MetaMask will prompt you to connect. Select your MetaMask wallet and authorize the connection to the Binance Smart Chain Testnet network.

see here the details to connect: https://docs.bnbchain.org/docs/remix-new/#configure-metamask-and-fund-your-account

```
Testnet
ChainID: 97
Symbol: BNB
Block Explorer: https://testnet.bscscan.com
```

RPC Urls of testnet

```
https://docs.bnbchain.org/docs/rpc
```

### 3.2 Minting NFTs

To mint NFTs using the Next.js NFT Minting Application, proceed as follows:

1. Ensure your wallet is connected to the Binance Smart Chain Testnet (see section 3.1).
2. Fill in the required details for the NFT, such as name, description, and url of asset.
3. Click on the "Mint NFT" button to initiate the minting process.
4. Confirm the transaction in your MetaMask wallet.

### 3.3 Viewing Minted NFTs

To view the NFTs you have minted from your connected wallet, follow these steps:

1. Navigate to the homepage of the Next.js NFT Minting Application.
2. The minted NFTs associated with your connected wallet will be displayed on the page.

```
In case you are not able to immediately see the updated NFTS please reload the page.
```

```
In case you are not able see your minted NFTS it is because PINATA starts to give CORS Error if we request to often. So wait for few minutes and then try again.
```

### Home Page

<img src="https://i.ibb.co/J5W6521/1.png" alt="1" border="0" />

### Connect Wallet

<img src="https://i.ibb.co/kyZBXjv/3.png" alt="3" border="0" />

### Dashboard

<img src="https://i.ibb.co/xDGmT9w/2.png" alt="2" border="0" />

### Filling metadata

<img src="https://i.ibb.co/s9B0kQk/4.png" alt="4" border="0" />

### Start the transaction

<img src="https://i.ibb.co/4m9Kdm9/5.png" alt="5" border="0" />

### Transaction Success and updated details are shown below after some time

<img src="https://i.ibb.co/8NnGtnZ/6.png" alt="6" border="0" />

### When connected to a different network

<img src="https://i.ibb.co/5BN1CqP/7.png" alt="7" border="0" />

## 4. Troubleshooting

If you encounter any issues or errors while using the Next.js NFT Minting Application, please try the following troubleshooting steps:

1. Make sure you are connected to the Binance Smart Chain Testnet in your MetaMask wallet.
2. Verify that you have sufficient test BNB tokens to cover the minting fee.
3. Clear your browser cache and reload the application.

Get testnet BNB (needed to deploy smart contracts on bsc)
https://discord.com/invite/bnbchain

Navigate to the discord link and in that type !faucet YOUR_WALLET_ADDRESS

You will get the test BNB then.
