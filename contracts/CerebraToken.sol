// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title CerebraToken
 * @dev Implementation of the Cerebra Token contract
 */
contract CerebraToken is ERC20, Ownable, Pausable {
    // Token distribution parameters
    uint256 public constant INITIAL_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public constant MAX_SUPPLY = 2000000000 * 10**18; // 2 billion tokens
    
    // Vesting parameters
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 releasedAmount;
        uint256 startTime;
        uint256 duration;
        bool revocable;
    }
    
    // Mapping from address to vesting schedule
    mapping(address => VestingSchedule) public vestingSchedules;
    
    // Events
    event VestingScheduleCreated(address indexed beneficiary, uint256 amount, uint256 startTime, uint256 duration);
    event VestingScheduleRevoked(address indexed beneficiary);
    event TokensReleased(address indexed beneficiary, uint256 amount);
    
    constructor() ERC20("Cerebra Token", "CEREBRA") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
    
    /**
     * @dev Creates a vesting schedule for a beneficiary
     * @param beneficiary The address of the beneficiary
     * @param amount The total amount of tokens to be vested
     * @param startTime The start time of the vesting schedule
     * @param duration The duration of the vesting schedule in seconds
     * @param revocable Whether the vesting schedule can be revoked
     */
    function createVestingSchedule(
        address beneficiary,
        uint256 amount,
        uint256 startTime,
        uint256 duration,
        bool revocable
    ) public onlyOwner {
        require(beneficiary != address(0), "Beneficiary cannot be the zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(startTime >= block.timestamp, "Start time must be in the future");
        require(duration > 0, "Duration must be greater than 0");
        require(vestingSchedules[beneficiary].totalAmount == 0, "Vesting schedule already exists");
        
        vestingSchedules[beneficiary] = VestingSchedule({
            totalAmount: amount,
            releasedAmount: 0,
            startTime: startTime,
            duration: duration,
            revocable: revocable
        });
        
        emit VestingScheduleCreated(beneficiary, amount, startTime, duration);
    }
    
    /**
     * @dev Revokes a vesting schedule
     * @param beneficiary The address of the beneficiary
     */
    function revokeVestingSchedule(address beneficiary) public onlyOwner {
        VestingSchedule storage schedule = vestingSchedules[beneficiary];
        require(schedule.totalAmount > 0, "Vesting schedule does not exist");
        require(schedule.revocable, "Vesting schedule is not revocable");
        
        uint256 unreleasedAmount = schedule.totalAmount - schedule.releasedAmount;
        if (unreleasedAmount > 0) {
            _transfer(beneficiary, owner(), unreleasedAmount);
        }
        
        delete vestingSchedules[beneficiary];
        
        emit VestingScheduleRevoked(beneficiary);
    }
    
    /**
     * @dev Releases vested tokens to the beneficiary
     */
    function releaseVestedTokens() public whenNotPaused {
        VestingSchedule storage schedule = vestingSchedules[msg.sender];
        require(schedule.totalAmount > 0, "Vesting schedule does not exist");
        
        uint256 vestedAmount = _calculateVestedAmount(schedule);
        uint256 unreleasedAmount = vestedAmount - schedule.releasedAmount;
        
        require(unreleasedAmount > 0, "No tokens to release");
        
        schedule.releasedAmount = vestedAmount;
        _transfer(address(this), msg.sender, unreleasedAmount);
        
        emit TokensReleased(msg.sender, unreleasedAmount);
    }
    
    /**
     * @dev Calculates the amount of tokens that have vested
     * @param schedule The vesting schedule
     * @return The amount of tokens that have vested
     */
    function _calculateVestedAmount(VestingSchedule memory schedule) internal view returns (uint256) {
        if (block.timestamp < schedule.startTime) {
            return 0;
        }
        
        if (block.timestamp >= schedule.startTime + schedule.duration) {
            return schedule.totalAmount;
        }
        
        return (schedule.totalAmount * (block.timestamp - schedule.startTime)) / schedule.duration;
    }
    
    /**
     * @dev Pauses the contract
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpauses the contract
     */
    function unpause() public onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Override the _beforeTokenTransfer function to add pausable functionality
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
} 