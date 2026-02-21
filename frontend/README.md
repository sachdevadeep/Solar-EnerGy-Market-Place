# SolarEnergy Frontend

This is the React frontend for the SolarEnergy dApp.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. **IMPORTANT**: Update the Contract Address
   - Open `src/App.jsx`
   - Locate `const CONTRACT_ADDRESS = "0xYourContractAddressHere";`
   - Replace it with your deployed `SolarEnergy` contract address.

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features
- Connect MetaMask Wallet
- View Account Address
- List Energy for sale (Amount, Price)
- Buy Energy from listings
- View available listings
