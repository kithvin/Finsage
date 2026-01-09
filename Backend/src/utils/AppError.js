/**
 * Custom Error Class
 * Extends the built-in Error class to include operational status codes and flags.
 * Used for handling expected errors (e.g., 404 Not Found, 400 Bad Request).
 */
class AppError extends Error {
  /**
   * Create a new AppError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
