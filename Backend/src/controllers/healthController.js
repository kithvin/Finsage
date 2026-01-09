/**
 * Health Check Controller
 * Returns the status of the server.
 * 
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {void} Sends a JSON response with status 200.
 */
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealth
};
