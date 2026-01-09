/**
 * @description Health Check Controller - Returns the operational status of the server
 * @route GET /api/v1/health
 * @access Public
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {void} Sends a JSON response with status 200 and health details
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
