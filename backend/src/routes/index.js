/**
 * API route aggregator — mounts all route modules under /api.
 */
const { Router } = require('express');
const authRoutes = require('./auth.routes');
const jobRoutes = require('./job.routes');
const blogRoutes = require('./blog.routes');
const dashboardRoutes = require('./dashboard.routes');
const publicRoutes = require('./public.routes');
const applicationRoutes = require('./application.routes');
const contactRoutes = require('./contact.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/jobs', jobRoutes);
router.use('/blogs', blogRoutes);
router.use('/applications', applicationRoutes);
router.use('/contact-inquiries', contactRoutes);
router.use('/public', publicRoutes);

router.get('/health', async (_req, res) => {
  const { testConnection } = require('../config/db');
  try {
    await testConnection();
    res.json({ success: true, message: 'IVAWORKS API is running', database: 'connected' });
  } catch {
    res.status(503).json({
      success: false,
      message: 'IVAWORKS API is running but database is unavailable',
      database: 'disconnected',
    });
  }
});

module.exports = router;
