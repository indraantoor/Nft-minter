import { IMetadata } from '../../hooks/useBNBMint.hook';

interface IMintedNftsPropsType {
  mintedNfts: IMetadata[];
}

const MintedNfts = ({ mintedNfts }: IMintedNftsPropsType) => {
  console.log('minted nfts', mintedNfts);
  return <div>minted nfts</div>;
};

export default MintedNfts;
