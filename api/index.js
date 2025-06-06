const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// RPC Hardhat
// const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const provider = new ethers.JsonRpcProvider('https://ethereum-holesky.publicnode.com');

// Smart Contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const oracleAddress = process.env.ORACLE_ADDRESS;
const local_private_key = process.env.PRIVATE_KEY;

const abiDonation = require('../abi/Donation.json');
const abiOracle = require('../abi/Oracle.json');

let lastUpdateTime = 0;
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
const currentTime = Date.now();

app.post('/donate', async (req, res) => {
  try {
    const { name, amount_idr, private_key } = req.body;

    if (!name || !amount_idr || !private_key) {
      return res.status(400).json({ status: 'error', message: 'Name, amount, and private key are required' });
    }

    // Buat signer dari private_key user
    const signer = new ethers.Wallet(private_key, provider);
    const donationContract = new ethers.Contract(contractAddress, abiDonation, signer);
    const oracleContract = new ethers.Contract(oracleAddress, abiOracle, signer);

    // Konversi IDR ke ETH
    if (currentTime - lastUpdateTime > UPDATE_INTERVAL) {
      lastUpdateTime = currentTime;
      // Call the update rate endpoint
      await axios.post(`http://localhost:${PORT}/update-rate`, {
        private_key: private_key,
      });
    }

    const ethRate = await oracleContract.getRate();
    // ethRate and amount_idr are assumed to be string or BigInt, convert to number for division
    const amountETH = Number(amount_idr) / Number(ethRate);

    const tx = await donationContract.donate(name, {
      value: ethers.parseEther(amountETH.toFixed(18)),
    });

    await tx.wait();

    res.json({
      status: 'success',
      txHash: tx.hash,
      ethAmount: amountETH,
      name: name,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post('/update-rate', async (req, res) => {
  try {
    const { private_key: private_key } = req.body;

    if (!private_key) {
      return res.status(400).json({ status: 'error', message: 'Private key is required' });
    }

    // Buat signer dari private_key user
    const signer = new ethers.Wallet(private_key, provider);
    const oracleContract = new ethers.Contract(oracleAddress, abiOracle, signer);

    // Ambil harga ETH dari API
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr');
    const ethPrice = response.data.ethereum.idr;

    const tx = await oracleContract.updateRate(ethPrice);
    await tx.wait();

    res.json({
      status: 'success',
      txHash: tx.hash,
      ethPrice: ethPrice,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// post withdraw
app.post('/withdraw', async (req, res) => {
  try {
    const { private_key } = req.body;

    if (!private_key) {
      return res.status(400).json({ status: 'error', message: 'Private key is required' });
    }

    // Buat signer dari private_key user
    const signer = new ethers.Wallet(private_key, provider);
    const donationContract = new ethers.Contract(contractAddress, abiDonation, signer);

    const tx = await donationContract.withdraw();
    await tx.wait();

    res.json({
      status: 'success',
      txHash: tx.hash,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Donation API running on http://localhost:${PORT}`));
