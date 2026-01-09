/**
 * Application Configuration
 * Centralizes all environment variables and configuration settings.
 */
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI,
  // Add more configuration variables here as needed
};

module.exports = config;
