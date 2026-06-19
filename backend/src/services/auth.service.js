/**
 * Authentication business logic.
 */
const bcrypt = require('bcrypt');
const AdminModel = require('../models/admin.model');
const { signToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const { validateLogin } = require('../validations/auth.validation');

async function login(credentials) {
  const { username, password } = validateLogin(credentials);

  const admin = await AdminModel.findByUsername(username);

  if (!admin || !admin.is_active) {
    throw new AppError('Invalid username or password', 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isMatch) {
    throw new AppError('Invalid username or password', 401);
  }

  const token = signToken({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
  });

  return {
    token,
    admin: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
  };
}

async function getProfile(adminId) {
  const admin = await AdminModel.findById(adminId);

  if (!admin || !admin.is_active) {
    throw new AppError('Admin not found', 404);
  }

  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
  };
}

module.exports = { login, getProfile };
