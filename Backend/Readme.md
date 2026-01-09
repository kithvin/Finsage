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

## API Endpoints

- Health Check: `GET /api/v1/health`
