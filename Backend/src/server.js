/**
 * @description Server Entry Point - Configures Express, connects to MongoDB, and starts the server
 * @module server
 */
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const routes = require('./routes/routes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middleware/errorMiddleware');

const app = express();

/**
 * @description Global Middleware Configuration
 */

// Enable Cross-Origin Resource Sharing
app.use(cors());

// HTTP request logging in development mode
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// Body parsers for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @description Route Configuration
 */

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Finsage API' });
});

// API routes
app.use('/api/v1', routes);

/**
 * @description Error Handling Configuration
 */

// Catch-all for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

/**
 * @description Database Connection and Server Startup
 */
mongoose.connect(config.mongodbUri, { dbName: config.mongodbDbName })
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
    
    // Start listening for requests
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port} in ${config.env} mode`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
