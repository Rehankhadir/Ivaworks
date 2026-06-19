const { Router } = require('express');
const ApplicationController = require('../controllers/application.controller');
const { authenticate } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(ApplicationController.list));
router.get('/:id', asyncHandler(ApplicationController.getById));
router.patch('/:id/status', asyncHandler(ApplicationController.updateStatus));
router.delete('/:id', asyncHandler(ApplicationController.remove));

module.exports = router;
