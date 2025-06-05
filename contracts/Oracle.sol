// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Oracle {
    uint256 public ethToIdr;

    event RateUpdated(uint256 newRate);

    function updateRate(uint256 _rate) external {
        ethToIdr = _rate;
        emit RateUpdated(_rate);
    }

    function getRate() external view returns (uint256) {
        return ethToIdr;
    }
}