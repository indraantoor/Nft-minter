/**
    @title BNBMint
    @dev A contract for minting and managing ERC721 tokens on the Binance Smart Chain.
    @dev It extends ERC721, ERC721Enumerable, ERC721URIStorage, and Ownable contracts from OpenZeppelin.
**/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract BNBMint is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  mapping(string => uint8) existingURIs;

  constructor() ERC721('BNBMint', 'BM') {}

  function _baseURI() internal pure override returns (string memory) {
    return 'ipfs://';
  }

  /**
    @dev Mints a new token with the given URI and assigns it to the specified address.
    @param to The address to assign the newly minted token to.
    @param uri The URI of the token metadata.
  **/
  function safeMint(address to, string memory uri) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function isContentOwned(string memory uri) public view returns (bool) {
    return existingURIs[uri] == 1;
  }

  /** 
    @dev Allows users to pay to mint a new token with the given metadata URI.
    @param recipient The address to assign the newly minted token to.
    @param metadataURI The URI of the token metadata.
    @return The ID of the newly minted token.
  **/
  function payToMint(
    address recipient,
    string memory metadataURI
  ) public payable returns (uint256) {
    // require(existingURIs[metadataURI] != 1, 'NFT already minted!');
    require(msg.value >= 0.005 ether, 'Insufficient Amount!');

    uint256 newItemId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    existingURIs[metadataURI] = 1;

    _mint(recipient, newItemId);
    _setTokenURI(newItemId, metadataURI);

    return newItemId;
  }

  function count() public view returns (uint256) {
    return _tokenIdCounter.current();
  }
}
