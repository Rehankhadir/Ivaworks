/**
 * Create or reset the admin account in MySQL (no default password in repo).
 * Usage: node scripts/set-admin-password.js "YourSecurePassword"
 * Optional: node scripts/set-admin-password.js "YourSecurePassword" admin admin@yourdomain.com
 *
 * On Hostinger SSH (env vars from panel are not in the shell — pass DB_* inline or export first):
 *   DB_HOST=127.0.0.1 DB_USER=... DB_NAME=... DB_PASSWORD=... node backend/scripts/set-admin-password.js "YourSecurePassword"
 */
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const env = require('../src/config/env');

const password = process.argv[2];
const username = process.argv[3] || 'admin';
const email = process.argv[4] || 'admin@ivaworks.com';

if (!password || password.length < 8) {
  console.error('Usage: node scripts/set-admin-password.js <password> [username] [email]');
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

async function main() {
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.database,
  });

  const hash = await bcrypt.hash(password, 12);

  const [existing] = await connection.execute(
    'SELECT id FROM admins WHERE username = ? LIMIT 1',
    [username]
  );

  if (existing.length > 0) {
    await connection.execute(
      'UPDATE admins SET password_hash = ?, email = ?, is_active = 1 WHERE username = ?',
      [hash, email, username]
    );
    console.log(`Password updated for admin user "${username}".`);
  } else {
    await connection.execute(
      `INSERT INTO admins (username, email, password_hash, role, is_active)
       VALUES (?, ?, ?, 'super_admin', 1)`,
      [username, email, hash]
    );
    console.log(`Admin user "${username}" created. You can sign in with the new password.`);
  }

  await connection.end();
}

main().catch((err) => {
  console.error('Failed to set admin password:', err.message);
  process.exit(1);
});
