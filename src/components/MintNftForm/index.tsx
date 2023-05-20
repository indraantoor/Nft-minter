import { useState } from 'react';
import Button from '../Button';
import { IMetadata, useBNBMint } from '../../hooks/useBNBMint.hook';

const MintNftForm = () => {
  const [nftFormValues, setNftFormValues] = useState<IMetadata>({
    url: '',
    name: '',
    description: '',
  });

  const { mintNFT } = useBNBMint();

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold mt-5">NFT Minter</h2>
        <p className="pt-3 pb-5 font-[300]">
          Simply add your {`asset's`} link, name, and description, then press
          {`"Mint."`}
        </p>
      </div>
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="font-[600]">
            Link to asset:
          </label>
          <input
            type="text"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            value={nftFormValues.url}
            onChange={(event) =>
              setNftFormValues((prev) => {
                return { ...prev, url: event.target.value };
              })
            }
            id="url"
            className="text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-[600]">
            Name:
          </label>
          <input
            type="text"
            placeholder="e.g. My NFT!"
            value={nftFormValues.name}
            onChange={(event) =>
              setNftFormValues((prev) => {
                return { ...prev, name: event.target.value };
              })
            }
            id="name"
            className="text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-[600]">
            Description:
          </label>
          <textarea
            placeholder="e.g. Details and description about the Nft"
            value={nftFormValues.description}
            onChange={(event) =>
              setNftFormValues((prev) => {
                return { ...prev, description: event.target.value };
              })
            }
            className="text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
          />
        </div>
        <Button
          className="mt-3"
          text="Mint NFT"
          onClick={() => mintNFT(nftFormValues)}
        />
      </form>
    </div>
  );
};

export default MintNftForm;
