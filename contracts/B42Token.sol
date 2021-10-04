// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract B42Token is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Bios42", "B42") {
        mint(_msgSender(), 1000 ether);
    }
}