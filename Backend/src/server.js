/**
 * Server Entry Point
 * Configures and starts the Express application.
 */
const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Finsage API' });
});

// Routes
app.use('/api/v1', routes);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port} in ${config.env} mode`);
});
