// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Escrow {
    using SafeERC20 for IERC20;
    IERC20 private token;

    mapping(address => mapping(address => uint256)) lockedIn;
    mapping(address => uint256) released;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function lock(address recipient, uint256 amount) external {
        lockedIn[msg.sender][recipient] += amount;
        token.safeTransferFrom(msg.sender, address(this), amount);
    }

    function release(address recipient) external {
        released[recipient] += lockedIn[msg.sender][recipient];
        lockedIn[msg.sender][recipient] = 0;
    }

    function lockedInBalance(address sender, address recipient) external view returns (uint256) {
        return lockedIn[sender][recipient];
    }

    function claimableBalance(address recipient) external view returns (uint256) {
        return released[recipient];
    }

    function claim() external {
        uint256 amount = released[msg.sender];
        released[msg.sender] = 0;
        token.safeTransfer(msg.sender, amount);
    }
}