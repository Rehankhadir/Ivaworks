/**
 * HTTP server entry point.
 * Bootstraps DB connection then starts listening.
 */
const app = require('./app');
const env = require('./config/env');
const { testConnection } = require('./config/db');

async function start() {
  try {
    await testConnection();
    console.log('✓ Database connected');

    app.listen(env.port, () => {
      console.log(`✓ IVAWORKS API running on http://localhost:${env.port}`);
      console.log(`  Environment: ${env.nodeEnv}`);
      console.log(`  Health:      http://localhost:${env.port}/api/health`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

start();
