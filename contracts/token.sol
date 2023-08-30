// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Token is ERC20("Huy token", "HT"), Ownable {
    uint256 private cap = 10_000_000 * 10 ** 18;

    constructor() {
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
        require(ERC20.totalSupply() + _amount <= cap, "Token: cap exceeded");
        _mint(_to, _amount);
    }
}
