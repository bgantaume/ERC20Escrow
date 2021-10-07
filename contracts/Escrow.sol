// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow { 
    IERC20 private token;
    uint256 private lockedIn = 0;
    bool private released = false;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function lock(address recipient, uint256 amount) external {
        lockedIn = amount;
        token.transferFrom(msg.sender, address(this), amount);
    }

    function release(address recipient, uint256 amount) external {
        released = true;
    }

    function lockedInBalance(address sender, address recipient) external view returns (uint256) {
        return lockedIn;
    }

    function claimableBalance(address recipient) external view returns (uint256) {
        if (released) {
            return lockedIn;
        }
        return 0;
    }

    function claim(uint256 amount) external {
        if (released) {
            token.transfer(msg.sender, amount);
        }
    }

}