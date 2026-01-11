# Finsage Backend

This is the REST API backend for Finsage.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (if not exists) with the following content:
   ```
   PORT=3000
   NODE_ENV=development
   ```

## Running the server

- Development mode:
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm start
  ```

## API Documentation

Detailed documentation for all API endpoints can be found in [documentation/API_DOCUMENTATION.md](./documentation/API_DOCUMENTATION.md).

### Core Endpoints:
- **Health Check**: `GET /api/v1/health`
- **Users**: `/api/v1/users`
- **Incomes**: `/api/v1/incomes`
- **Assets**: `/api/v1/assets`
- **Liabilities**: `/api/v1/liabilities`
- **Cards**: `/api/v1/cards`

