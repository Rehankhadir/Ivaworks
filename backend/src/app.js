/**
 * Express application setup.
 * Separated from server.js so the app can be tested without listening.
 */
const path = require('path');
const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const apiRoutes = require('./routes');
const notFoundMiddleware = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// ---------------------------------------------------------------------------
// Security & parsing
// ---------------------------------------------------------------------------
app.use(
  cors({
    origin: [env.cors.frontendUrl, env.cors.adminUrl],
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Static file serving for uploaded blog images
// ---------------------------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------
app.use('/api', apiRoutes);

// ---------------------------------------------------------------------------
// Error handling (order matters)
// ---------------------------------------------------------------------------
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
