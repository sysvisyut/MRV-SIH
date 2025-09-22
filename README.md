# Proper Blue Carbon

A complete Hardhat + React DApp showcasing carbon credit tokenization and a simple marketplace on Sepolia.

## Overview
- Smart contracts: `CarbonCreditToken`, `ProjectRegistry`, `Marketplace`
- Tooling: Hardhat, Ignition, Ethers v6
- Frontend: React (CRA) with Ethers v6

## Phase 1: Environment Setup
- Create folders: `blockchain/` and `frontend/`
- VS Code extensions (install manually): Solidity, ESLint, Prettier

## Phase 2: Blockchain Setup
From `blockchain/`:
```bash
npm init -y
npm i -D hardhat @nomicfoundation/hardhat-toolbox dotenv
npm i @openzeppelin/contracts
npx hardhat compile
```

Configure `hardhat.config.js` and create `.env`:
```
INFURA_API_KEY=your_infura_api_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
PRIVATE_KEY=your_wallet_private_key_without_0x
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

## Phase 3: Smart Contracts
Implemented in `blockchain/contracts/`.

## Phase 4: Tests
Run in `blockchain/`:
```bash
npx hardhat test
```

## Phase 5: Deployment
Scripts in `blockchain/scripts` and Ignition module in `blockchain/ignition/modules`.

Deploy (Hardhat local default unless `--network sepolia` with env set):
```bash
node scripts/deploy.js --network sepolia
```

## Phase 6: MetaMask & Sepolia
- Add Sepolia network (Chain ID 11155111)
- Get Sepolia ETH from a faucet
- Create Infura/Alchemy/Etherscan keys and fill `.env`

## Phase 7: Compile and Test
```bash
npx hardhat compile
npx hardhat test
```

## Phase 8: Frontend Integration
From `frontend/`:
```bash
npx create-react-app .
npm i ethers dotenv
npm start
```

Add ABIs after contract compile:
- Copy to `frontend/src/abis/` from `blockchain/artifacts/contracts/*/*.json`

Set addresses in `frontend/.env` (create if missing):
```
REACT_APP_SEPOLIA_RPC=https://sepolia.infura.io/v3/your_infura_api_key_here
REACT_APP_TOKEN_CONTRACT_ADDRESS=
REACT_APP_REGISTRY_CONTRACT_ADDRESS=
REACT_APP_MARKETPLACE_CONTRACT_ADDRESS=
```

## Phase 9: Testing Complete Setup
- Start frontend: `npm start` (inside `frontend/`)
- Verify wallet connects
- After copying ABIs and setting addresses, use UI to read token name/symbol

## Success Checklist
- Contracts compile and tests pass (3/3)
- Deployment outputs addresses
- Frontend launches and connects to MetaMask
- Token info readable after ABIs+addresses set

## Common Issues & Solutions
- RPC errors: ensure correct Infura/Alchemy keys
- Invalid private key: omit `0x` if using this template
- ABI/address mismatch: re-copy ABIs and confirm env variables

Implementation complete. Project ready for SIH 2025 demo!
