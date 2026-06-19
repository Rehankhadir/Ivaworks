/**
 * JWT authentication middleware.
 * Role-ready: attach authorize() after authenticate for RBAC.
 */
const { verifyToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');

function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
    return next();
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }
}

/**
 * Role-based access control — pass allowed roles after authenticate.
 * Example: router.post('/', authenticate, authorize('super_admin'), ...)
 */
function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    return next();
  };
}

module.exports = { authenticate, authorize };
