# Web3 Donation Tracker

Aplikasi untuk melacak donasi berbasis Web3.

## Cara Menjalankan Proyek

### 1. Menjalankan Backend

Backend terdapat pada folder `api` dengan entry point di `api/index.js`.

Jalankan perintah berikut di terminal:

```bash
cd api
node index.js
```

Pastikan Node.js sudah terinstal di sistem Anda.

### 2. Menjalankan Frontend

Frontend terdapat pada folder `web3dona`.

Jalankan perintah berikut di terminal:

```bash
cd web3dona
npm run dev
```

Aplikasi frontend akan berjalan di `http://localhost:3000` (atau port yang tertera di terminal).

---

**Catatan:**  
Pastikan backend sudah berjalan sebelum menjalankan frontend agar aplikasi dapat berfungsi dengan baik.

Smart Contracts sudah terdeploy di jaringan Holesky di alamat berikut:

```plaintext
donation: 0x29Fa28E8A707dfB1d8b21E82C5E4eB083bfb16BB
oracle : 0x6c979be2B848AC0dA9AbE6fEb05253f6fe88EC94
```

Link ke Etherscan(Donation): [Holesky Etherscan Donation](https://holesky.etherscan.io/address/0x29Fa28E8A707dfB1d8b21E82C5E4eB083bfb16BB)

Link ke Etherscan(Oracle): [Holesky Etherscan Oracle](https://holesky.etherscan.io/address/0x6c979be2B848AC0dA9AbE6fEb05253f6fe88EC94)

Video Demonstrasi: [Demonstrasi Web3 Donation Tracker](https://youtu.be/b5LVfhokHBA)

Video Serangan: [Demonstrasi Serangan](https://youtu.be/ziRoKyVIOcM)

Generated by [GitHub Copilot] with some modifications.
