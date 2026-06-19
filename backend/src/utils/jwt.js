/**
 * JWT sign / verify wrappers — isolates jsonwebtoken from the rest of the app.
 */
const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signToken(payload) {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
}

function verifyToken(token) {
  return jwt.verify(token, env.jwt.secret);
}

module.exports = { signToken, verifyToken };
