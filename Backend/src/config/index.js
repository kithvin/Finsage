const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Application Configuration
 * Centralizes all environment variables and configuration settings.
 * 
 * @property {number} port - The port number the server will listen on. Defaults to 5000.
 * @property {string} env - The current environment (development, production, etc.). Defaults to 'development'.
 */
const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  // Add more configuration variables here as needed (e.g., DB_URI, JWT_SECRET)
};

module.exports = config;
