/**
 * @description Async Error Wrapper - Higher-order function to catch errors in asynchronous middleware
 * @param {Function} fn - The asynchronous function to wrap
 * @returns {Function} A new function that executes the wrapped function and catches any errors
 */
module.exports = fn => {
  /**
   * @description Wrapped Middleware Function - Executes the original function and forwards any errors to the next middleware
   * @param {import('express').Request} req - The Express request object
   * @param {import('express').Response} res - The Express response object
   * @param {import('express').NextFunction} next - The Express next middleware function
   */
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
