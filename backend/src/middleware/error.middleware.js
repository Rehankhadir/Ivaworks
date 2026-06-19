/**
 * Global error handler — last middleware in the chain.
 * Distinguishes operational AppErrors from unexpected failures.
 */
const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, _req, res, _next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File size exceeds the allowed limit' });
  }
  if (err.message && err.message.includes('Only PDF')) {
    return res.status(400).json({ success: false, message: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  const response = {
    success: false,
    message,
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  if (env.nodeEnv === 'development' && statusCode === 500 && !err.isOperational) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorMiddleware;
