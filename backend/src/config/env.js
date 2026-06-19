/**
 * Centralised environment configuration.
 * All process.env access lives here — never scatter env reads across the codebase.
 */
const fs = require('fs');
const path = require('path');

function readEnv(key) {
  const value = process.env[key];
  return typeof value === 'string' ? value.trim() : value;
}

const nodeEnv = readEnv('NODE_ENV') || 'development';
const isProduction = nodeEnv === 'production';
const envFilePath = path.join(__dirname, '..', '..', '.env');

// Local dev uses backend/.env. Production (Hostinger) uses panel env vars only.
if (!isProduction && fs.existsSync(envFilePath)) {
  require('dotenv').config({ path: envFilePath });
}

const env = {
  nodeEnv,
  port: parseInt(readEnv('PORT'), 10) || (isProduction ? 3000 : 5000),

  db: {
    host: readEnv('DB_HOST') || 'localhost',
    port: parseInt(readEnv('DB_PORT'), 10) || 3306,
    user: readEnv('DB_USER') || (isProduction ? '' : 'root'),
    password: readEnv('DB_PASSWORD') || '',
    database: readEnv('DB_NAME') || (isProduction ? '' : 'ivaworks'),
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
