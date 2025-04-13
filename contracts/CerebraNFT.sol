// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CerebraNFT
 * @dev Implementation of the Cerebra NFT contract
 */
contract CerebraNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to memory hash
    mapping(uint256 => string) private _memoryHashes;
    
    // Mapping from token ID to transformation hash
    mapping(uint256 => string) private _transformationHashes;
    
    // Mapping from token ID to creator address
    mapping(uint256 => address) private _creators;
    
    // Mapping from token ID to royalty percentage (in basis points, 1% = 100)
    mapping(uint256 => uint256) private _royalties;
    
    // Platform fee in basis points (1% = 100)
    uint256 public platformFee = 250; // 2.5%
    
    // Events
    event MemoryNFTMinted(uint256 indexed tokenId, address indexed creator, string memoryHash, string transformationHash);
    event RoyaltyUpdated(uint256 indexed tokenId, uint256 newRoyalty);
    
    constructor() ERC721("Cerebra Memory NFT", "CMNFT") Ownable(msg.sender) {}
    
    /**
     * @dev Mints a new NFT for a memory transformation
     * @param memoryHash The IPFS hash of the original memory
     * @param transformationHash The IPFS hash of the transformed memory
     * @param tokenURI The URI for the token metadata
     * @param royaltyPercentage The royalty percentage in basis points (1% = 100)
     * @return The ID of the newly minted token
     */
    function mintNFT(
        string memory memoryHash,
        string memory transformationHash,
        string memory tokenURI,
        uint256 royaltyPercentage
    ) public returns (uint256) {
        require(royaltyPercentage <= 1000, "Royalty cannot exceed 10%");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        _memoryHashes[newTokenId] = memoryHash;
        _transformationHashes[newTokenId] = transformationHash;
        _creators[newTokenId] = msg.sender;
        _royalties[newTokenId] = royaltyPercentage;
        
        emit MemoryNFTMinted(newTokenId, msg.sender, memoryHash, transformationHash);
        
        return newTokenId;
    }
    
    /**
     * @dev Updates the royalty percentage for a token
     * @param tokenId The ID of the token
     * @param newRoyaltyPercentage The new royalty percentage in basis points
     */
    function updateRoyalty(uint256 tokenId, uint256 newRoyaltyPercentage) public {
        require(_exists(tokenId), "Token does not exist");
        require(msg.sender == ownerOf(tokenId), "Not the token owner");
        require(newRoyaltyPercentage <= 1000, "Royalty cannot exceed 10%");
        
        _royalties[tokenId] = newRoyaltyPercentage;
        emit RoyaltyUpdated(tokenId, newRoyaltyPercentage);
    }
    
    /**
     * @dev Returns the memory hash for a token
     * @param tokenId The ID of the token
     * @return The memory hash
     */
    function getMemoryHash(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _memoryHashes[tokenId];
    }
    
    /**
     * @dev Returns the transformation hash for a token
     * @param tokenId The ID of the token
     * @return The transformation hash
     */
    function getTransformationHash(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _transformationHashes[tokenId];
    }
    
    /**
     * @dev Returns the creator address for a token
     * @param tokenId The ID of the token
     * @return The creator address
     */
    function getCreator(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "Token does not exist");
        return _creators[tokenId];
    }
    
    /**
     * @dev Returns the royalty percentage for a token
     * @param tokenId The ID of the token
     * @return The royalty percentage in basis points
     */
    function getRoyalty(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _royalties[tokenId];
    }
    
    /**
     * @dev Returns the platform fee
     * @return The platform fee in basis points
     */
    function getPlatformFee() public view returns (uint256) {
        return platformFee;
    }
    
    /**
     * @dev Updates the platform fee
     * @param newFee The new platform fee in basis points
     */
    function updatePlatformFee(uint256 newFee) public onlyOwner {
        require(newFee <= 1000, "Fee cannot exceed 10%");
        platformFee = newFee;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 