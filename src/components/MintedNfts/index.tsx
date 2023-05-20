import { useEffect, useState } from 'react';
import { IToken } from '../../hooks/useBNBMint.hook';
import { useContract } from '../../hooks/useContract.hook';
import { IAppContext, useAppContext } from '../../context/AppContext';

const MintedNfts = () => {
  const [mintedNfts, setMintedNfts] = useState<IToken[]>([]);

  const { state } = useAppContext() as IAppContext;
  const { address } = state;
  const contract = useContract();

  useEffect(() => {
    const fetchTokens = async () => {
      const balance = await contract?.balanceOf(address);
      const balanceFormatted = Number(balance);
      const tokens: IToken[] = [];
      for (let i = 0; i < balanceFormatted; i++) {
        const tokenId = await contract?.tokenOfOwnerByIndex(address, i);
        const tokenURI = await contract?.tokenURI(tokenId);
        tokens.push({ tokenId: Number(tokenId), tokenURI });
      }

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const metadataRes = await fetch(token.tokenURI.substring(7));
        const metadata = await metadataRes.json();
        token.metadata = metadata;
      }

      setMintedNfts(tokens);
    };

    fetchTokens();
  }, [contract, address]);

  return (
    <div className="mt-14">
      <div className="text-center">
        <h2 className="text-3xl font-bold mt-5">Minted Nft Tokens</h2>
        <div>
          <span className="mr-1 font-bold">Count:</span>
          <span>{mintedNfts.length}</span>
        </div>
      </div>

      {mintedNfts.length > 0
        ? mintedNfts.map((mintedNft, i) => (
            <div key={i} className="h-full text-center">
              <div className="bg-white shadow-md rounded-md p-4 m-4">
                <div className="mb-2 flex items-center gap-2 justify-center">
                  <h2 className="text-lg font-bold">Name:</h2>
                  <p className="font-[300]">{mintedNft.metadata?.name}</p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600">Description:</p>
                  <p className="font-[300]">
                    {mintedNft.metadata?.description}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600">URL:</p>
                  <p className="font-[300]">{mintedNft.metadata?.url}</p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default MintedNfts;
