// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow { 
    bool released = false;
    IERC20 token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function lock(address recipient, uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
    }

    function release(address recipient, uint256 amount) external {
        released = true;
    }

    function lockedInBalance(address account) external view returns (uint256) {
        return 0;
    }

    function claimableBalance(address account) external view returns (uint256) {
        return 0;
    }

    function claim(uint256 amount) external {
        if (released) {
            token.transfer(msg.sender, amount);
        }
    }

}