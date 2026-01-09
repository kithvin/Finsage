const AppError = require('../utils/AppError');
const config = require('../config');

/**
 * Send detailed error response in development environment.
 * Includes stack trace and full error object.
 * 
 * @param {Error} err - The error object.
 * @param {import('express').Response} res - The Express response object.
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

/**
 * Send user-friendly error response in production environment.
 * Hides implementation details and stack traces.
 * 
 * @param {Error} err - The error object.
 * @param {import('express').Response} res - The Express response object.
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

/**
 * Global Error Handling Middleware
 * Intercepts all errors passed to next() and sends an appropriate response.
 * 
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    sendErrorProd(error, res);
  }
};
