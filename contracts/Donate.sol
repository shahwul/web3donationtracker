// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Donation {
    address public owner;
    uint256 public unlockTime;

    event Donated(address indexed donor, string name, uint256 amount);

    constructor(uint256 _unlockTime) {
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");
        owner = msg.sender;
        unlockTime = _unlockTime;
    }

    function donate(string memory _name) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        emit Donated(msg.sender, _name, msg.value);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(block.timestamp >= unlockTime, "Funds are locked");
        
        payable(owner).transfer(address(this).balance);
    }
}
