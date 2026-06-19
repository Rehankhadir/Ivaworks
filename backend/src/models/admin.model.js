/**
 * Admin data access layer — all SQL for admins lives here.
 */
const { pool } = require('../config/db');

async function findByUsername(username) {
  const [rows] = await pool.execute(
    `SELECT id, username, email, password_hash, role, is_active, created_at, updated_at
     FROM admins
     WHERE username = ?
     LIMIT 1`,
    [username]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT id, username, email, role, is_active, created_at, updated_at
     FROM admins
     WHERE id = ?
     LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { findByUsername, findById };
