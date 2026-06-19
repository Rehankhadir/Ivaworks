const AppError = require('../utils/AppError');

function validateLogin(body) {
  const errors = [];

  if (!body.username || typeof body.username !== 'string' || !body.username.trim()) {
    errors.push({ field: 'username', message: 'Username is required' });
  }

  if (!body.password || typeof body.password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length) {
    throw new AppError('Validation failed', 422, errors);
  }

  return {
    username: body.username.trim(),
    password: body.password,
  };
}

module.exports = { validateLogin };
