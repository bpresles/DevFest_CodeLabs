// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Jurys is Ownable, ERC721Enumerable {

    constructor (string memory name, string memory symbol) ERC721(name, symbol) {}

    mapping(uint => address) ListJury;

    function getJuryId(address jury) public view returns (uint) {
        require(0 < this.balanceOf(jury), "Jury: This address doesn't have any jury.");

        uint juryTokenId = tokenOfOwnerByIndex(jury, 0);

        return juryTokenId;
    }
}
