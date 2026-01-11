/**
 * @description Custom Error Class - Extends the built-in Error class to handle operational errors
 * @class AppError
 * @extends Error
 */
class AppError extends Error {
  /**
   * @description Create a new AppError instance
   * @param {string} message - The human-readable error message
   * @param {number} statusCode - The HTTP status code (e.g., 404, 400, 500)
   */
  constructor(message, statusCode) {
    super(message);

    /**
     * @property {number} statusCode - The HTTP status code
     */
    this.statusCode = statusCode;

    /**
     * @property {string} status - The status string ('fail' for 4xx, 'error' for 5xx)
     */
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    /**
     * @property {boolean} isOperational - Flag to distinguish operational errors from programming errors
     */
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
