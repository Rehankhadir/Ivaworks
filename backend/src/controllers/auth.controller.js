/**
 * Thin auth controller — delegates to AuthService, formats responses.
 */
const AuthService = require('../services/auth.service');
const { success } = require('../utils/response');

async function login(req, res) {
  const result = await AuthService.login(req.body);
  return success(res, { message: 'Login successful', data: result });
}

async function getMe(req, res) {
  const admin = await AuthService.getProfile(req.user.id);
  return success(res, { message: 'Profile retrieved', data: admin });
}

module.exports = { login, getMe };
