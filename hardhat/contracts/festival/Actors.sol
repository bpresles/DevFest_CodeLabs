// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Management of Actor
/// @Author Colas Vincent
/// @notice Smart contract to generate digital actors for the festival.
contract Actors is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    /// @notice Event when token generated
    event ActorMinted(uint tokenId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol){
    }

    /// @notice Mint a new actor.
    /// @param _tokenURI The token URI.
    /// @emit ActorMinted event when actor is minted.
    function mint(string memory _tokenURI) external onlyOwner{
        uint tokenId = totalSupply() +1;
        _safeMint(owner(), tokenId);

        require(_exists(tokenId), "Actor: token generation failed");
        _setTokenURI(tokenId, _tokenURI);

        emit ActorMinted(tokenId);

        _approve(owner(), tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
