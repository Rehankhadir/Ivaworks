const { Router } = require('express');
const DashboardController = require('../controllers/dashboard.controller');
const { authenticate } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.get('/stats', authenticate, asyncHandler(DashboardController.getStats));

module.exports = router;
