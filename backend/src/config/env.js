/**
 * Centralised environment configuration.
 * All process.env access lives here — never scatter env reads across the codebase.
 */
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env'),
});

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ivaworks',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    adminUrl: process.env.ADMIN_URL || 'http://localhost:5174',
  },

  upload: {
    maxFileSizeMb: parseInt(process.env.UPLOAD_MAX_MB, 10) || 5,
  },

  email: {
    enabled: process.env.EMAIL_ENABLED !== 'false',
    notifyTo: process.env.NOTIFY_EMAIL || '',
    from: process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@ivaworks.com',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      // Set to false on local Windows if antivirus/proxy causes "self-signed certificate in certificate chain"
      tlsRejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  },
};

module.exports = env;
