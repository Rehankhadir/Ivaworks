/**
 * Create or reset the admin account in MySQL (no default password in repo).
 * Usage: node scripts/set-admin-password.js "YourSecurePassword"
 * Optional: node scripts/set-admin-password.js "YourSecurePassword" admin admin@yourdomain.com
 */
require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

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
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ivaworks',
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
