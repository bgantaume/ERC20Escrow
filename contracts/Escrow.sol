// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow { 
    IERC20 private token;

    mapping(address => mapping(address => uint256)) lockedIn;
    mapping(address => uint256) released;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function lock(address recipient, uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, 'Insufficient balance');
        require(token.allowance(msg.sender, address(this)) >= amount, 'Escrow not authorized');

        // Todo : test the require
        require(token.transferFrom(msg.sender, address(this), amount), "Could not tranfer tokens");
        lockedIn[msg.sender][recipient] += amount;
    }

    function release(address recipient) external {
        uint256 amount = lockedIn[msg.sender][recipient];
        lockedIn[msg.sender][recipient] = 0;
        released[recipient] += amount;
    }

    function lockedInBalance(address sender, address recipient) external view returns (uint256) {
        return lockedIn[sender][recipient];
    }

    function claimableBalance(address recipient) external view returns (uint256) {
        return released[recipient];
    }

    function claim() external {
        uint256 amount = released[msg.sender];
        if (amount > 0) {
            released[msg.sender] = 0;

            // Todo : test the require
            require(token.transfer(msg.sender, amount), "Could not tranfer merchant's balance");
        }
    }

}