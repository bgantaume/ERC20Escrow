// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow { 
    function lock(address token, uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    function release(address token, uint256 amount) external {

    }

    function claim(address token, uint256 amount) external {
        IERC20(token).transfer(msg.sender, amount);
    }

}