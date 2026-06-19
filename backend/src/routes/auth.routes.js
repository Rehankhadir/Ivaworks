const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.post('/login', asyncHandler(AuthController.login));
router.get('/me', authenticate, asyncHandler(AuthController.getMe));

module.exports = router;
