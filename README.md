# 1️⃣ Project Abbreviation

**KEZO** can stand for:

**K** – **Kinetic** (fast, smooth transaction flow)
**E** – **Execution** (meta-transaction execution via relayer)
**Z** – **Zero-gas** (gasless transaction experience)
**O** – **Onboarding** (easy user onboarding for Web3)

So:

```md
# Kezo – Gasless Wallet Infrastructure on Starknet

KEZO (Kinetic Execution, Zero-gas Onboarding) is a Starknet-native backend infrastructure for gasless wallets.  
It enables secure, account-abstraction-powered meta-transaction execution and gas sponsorship via a relayer and paymaster system.

Kezo is designed to simplify onboarding, provide a Web2-style user experience, and enable mass adoption of Web3 applications without requiring users to hold native gas tokens.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Architecture](#architecture)  
4. [Technology Stack](#technology-stack)  
5. [Project Structure](#project-structure)  
6. [Environment Configuration](#environment-configuration)  
7. [Installation](#installation)  
8. [API Endpoints](#api-endpoints)  
9. [Administrative Endpoints](#administrative-endpoints)  
10. [Security Model](#security-model)  
11. [Testing](#testing)  
12. [Use Cases](#use-cases)  
13. [Production Roadmap](#production-roadmap)  
14. [License](#license)

---

## Overview

Kezo provides:

- Gasless transactions on Starknet via Account Abstraction
- Relayer service for verified meta-transaction submission
- Paymaster-based gas sponsorship
- Admin and operator controls for funding, usage limits, and monitoring
- User-friendly onboarding without compromising security

The backend never stores user private keys; all transactions are signed locally and relayed securely to Starknet.

---

## Features

- Gas-sponsored transaction execution
- Meta-transaction relaying with signature verification
- Nonce-based replay protection
- Rate limiting and per-user monthly spending caps
- Administrative paymaster funding and control
- Transaction logging and monitoring
- SQLite for development, Postgres-ready for production
- Session key support for wallets and dApps

---

## Architecture

```

Client Wallet
|
| Signed Meta-Transaction
|
Kezo Relayer API
|
| Sponsored Transaction
|
Starknet Network
|
Account Contract -> Paymaster Contract -> Execution

```

---

## Technology Stack

- Blockchain: Starknet  
- Smart Contracts: Cairo 1  
- Backend: Node.js + TypeScript  
- API Framework: Express  
- Database: SQLite (dev), Postgres (prod)  
- RPC: starknet.js  
- Authentication: Admin API Key  
- Deployment: Docker, VPS, Railway, or Render  

---

## Project Structure

```

src/
├── admin.ts          # Admin endpoints for funding, caps, logs
├── db.ts             # Database connection and schema
├── paymaster.ts      # Paymaster interaction helpers
├── relayer.ts        # Core relayer logic
├── server.ts         # Application entry point
├── types.ts          # TypeScript types
└── utils/
└── signature.ts  # Signature verification utilities

```

---

## Environment Configuration

Create a `.env` file:

```

PORT=8080

STARKNET_NETWORK=alpha-goerli
SEQUENCER_BASE_URL=[https://alpha-goerli.starknet.io](https://alpha-goerli.starknet.io)

RELAYER_PRIVATE_KEY=0x...
PAYMASTER_PRIVATE_KEY=0x...
PAYMASTER_ADDRESS=0x...

ADMIN_API_KEY=supersecretkey

DB_PATH=./data/relayer.db
SPEND_LIMIT_PER_USER_USD=10
MAX_REQUESTS_PER_MINUTE=10

````

> **Note:** All private keys must be stored securely in production using environment secret managers.

---

## Installation

Install dependencies:

```bash
npm install
````

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## API Endpoints

### Health Check

```
GET /health
```

---

### Submit Gasless Transaction

```
POST /relayer/submit
```

**Request Body:**

```json
{
  "account": "0x123...",
  "calldata": ["0x1", "0x2"],
  "nonce": "0",
  "signature": "0xABC"
}
```

**Response:**

```json
{
  "ok": true,
  "txHash": "0xTRANSACTION_HASH"
}
```

---

### Paymaster Balance

```
GET /paymaster/balance
```

---

## Administrative Endpoints

Admin endpoints are protected with `x-admin-key` header.

### Set User Spending Cap

```
POST /admin/set-cap
```

**Request Body:**

```json
{
  "account": "0x123...",
  "monthly_cap": 100000
}
```

---

### Top Up Paymaster

```
POST /admin/topup
```

---

### View Relayer Logs

```
GET /admin/logs
```

---

## Security Model

* Transactions are signed by user account or session key; private keys are never stored server-side
* Signature verification and nonce validation prevent replay attacks
* Rate limiting prevents transaction spam
* Per-user monthly caps prevent paymaster abuse
* Admin routes secured with API keys
* All sensitive values must be encrypted or stored in secure secret managers in production

---

## Testing

Example request:

```bash
curl -X POST http://localhost:8080/relayer/submit \
  -H "Content-Type: application/json" \
  -d '{
    "account":"0x123",
    "calldata":["0x1"],
    "nonce":"0",
    "signature":"0xabc"
  }'
```

---

## Use Cases

* Gasless consumer wallets
* Social login wallets
* DeFi onboarding without gas
* Sponsored DAO transactions
* Educational or campus wallets
* Fintech applications on Starknet

---

## Production Roadmap

* Redis-based distributed rate limiting
* JWT-based admin authentication
* Multi-paymaster support
* Usage analytics and monitoring
* Fiat on-ramp integration
* Mobile wallet support
* Hardware-backed key storage

---

## License

MIT License

```

---

