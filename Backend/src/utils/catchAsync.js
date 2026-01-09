/**
 * Async Error Wrapper
 * Wraps asynchronous controller functions to catch errors and pass them to the global error handler.
 * Eliminates the need for try-catch blocks in every controller.
 * 
 * @param {Function} fn - The asynchronous function to wrap.
 * @returns {Function} A new function that executes the wrapped function and catches any errors.
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
