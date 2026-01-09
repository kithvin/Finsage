/**
 * @description Async Error Wrapper - Higher-order function to catch errors in asynchronous middleware
 * @param {Function} fn - The asynchronous function to wrap
 * @returns {Function} A new function that executes the wrapped function and catches any errors
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
