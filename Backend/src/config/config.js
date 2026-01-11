/**
 * Application Configuration
 * Centralizes all environment variables and configuration settings.
 */
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * @description Configuration Object - Holds all environment-specific settings
 * @property {number|string} port - The port on which the server will run
 * @property {string} env - The current environment (development, production, etc.)
 * @property {string} mongodbUri - The connection string for MongoDB Atlas
 * @property {string} mongodbDbName - The name of the database to use
 */
const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI,
  mongodbDbName: process.env.MONGODB_DB_NAME || 'FinsageDB',
  // Add more configuration variables here as needed
};

module.exports = config;
