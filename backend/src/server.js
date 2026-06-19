/**
 * HTTP server entry point.
 * Bootstraps DB connection then starts listening.
 */
const app = require('./app');
const env = require('./config/env');
const { testConnection } = require('./config/db');

async function start() {
  app.listen(env.port, '0.0.0.0', () => {
    console.log(`✓ IVAWORKS API running on port ${env.port}`);
    console.log(`  Environment: ${env.nodeEnv}`);
    console.log(`  Health:      /api/health`);
  });

  try {
    await testConnection();
    console.log('✓ Database connected');
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    console.error('  Check DB_HOST, DB_USER, DB_NAME, DB_PASSWORD in Hostinger env vars');
  }
}

start();
