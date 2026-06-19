/**
 * MySQL connection pool (mysql2/promise).
 * Pooling is required for production — reuses connections under concurrent load.
 */
const mysql = require('mysql2/promise');
const env = require('./env');

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/**
 * Verify database connectivity on server startup.
 */
async function testConnection() {
  const connection = await pool.getConnection();
  await connection.ping();
  connection.release();
}

function getDbConfigSummary() {
  const { host, port, user, database, password } = env.db;
  return {
    host,
    port,
    user: user || '(not set)',
    database: database || '(not set)',
    passwordSet: Boolean(password),
  };
}

module.exports = { pool, testConnection, getDbConfigSummary };
