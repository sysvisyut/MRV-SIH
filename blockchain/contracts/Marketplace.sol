// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    IERC20 public immutable token;
    uint256 public pricePerCreditWei; // price per 1 token in wei

    event Purchased(address indexed buyer, uint256 amount, uint256 totalPaid);
    event PriceUpdated(uint256 newPriceWei);

    constructor(address tokenAddress, uint256 initialPriceWei) Ownable(msg.sender) {
        require(tokenAddress != address(0), "token addr");
        require(initialPriceWei > 0, "price");
        token = IERC20(tokenAddress);
        pricePerCreditWei = initialPriceWei;
        emit PriceUpdated(initialPriceWei);
    }

    function setPrice(uint256 newPriceWei) external onlyOwner {
        require(newPriceWei > 0, "price");
        pricePerCreditWei = newPriceWei;
        emit PriceUpdated(newPriceWei);
    }

    function buyCredits(uint256 amount) external payable {
        require(amount > 0, "amount");
        uint256 cost = amount * pricePerCreditWei;
        require(msg.value == cost, "incorrect eth");
        require(token.transfer(msg.sender, amount), "transfer failed");
        emit Purchased(msg.sender, amount, cost);
    }

    function withdraw(address payable to) external onlyOwner {
        require(to != address(0), "to");
        to.transfer(address(this).balance);
    }
}
