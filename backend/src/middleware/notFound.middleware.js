/**
 * 404 handler — catches unmatched routes before error middleware.
 */
const AppError = require('../utils/AppError');

function notFoundMiddleware(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFoundMiddleware;
