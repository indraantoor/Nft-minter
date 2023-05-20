import Button from '../Button';

const MintNftForm = () => {
  return (
    <div>
      <h2>NFT Minter</h2>
      <p>
        Simply add your {`asset's`} link, name, and description, then press
        {`"Mint."`}
      </p>
      <form>
        <h2> Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          // onChange={(event) => setURL(event.target.value)}
        />
        <h2> Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          // onChange={(event) => setName(event.target.value)}
        />
        <h2> Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          // onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <Button text="Mint NFT" />
    </div>
  );
};

export default MintNftForm;
