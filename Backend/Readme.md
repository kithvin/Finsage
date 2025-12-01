# Finsage Backend

## Description
The Finsage Backend is the server-side application for the Finsage project. It is built using Node.js and Express.js to handle API requests and manage data for the Finsage application.

## Features
- RESTful API endpoints for various functionalities.
- Environment-based configuration using `.env`.
- Modular structure for scalability and maintainability.

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```
PORT=5000
DB_CONNECTION_STRING=your_database_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

## Scripts
- Start the server:
  ```bash
  npm start
  ```
- Start the server in development mode:
  ```bash
  npm run dev
  ```

## Project Structure
```
Backend/
├── src/
│   ├── Server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── package.json
└── Readme.md
```

## Dependencies
- express: ^4.18.2

## Dev Dependencies
- nodemon: ^2.0.22

## License
This project is licensed under the ISC License.