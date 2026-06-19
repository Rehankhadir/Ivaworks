const { Router } = require('express');
const ContactController = require('../controllers/contact.controller');
const { authenticate } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(ContactController.list));
router.get('/:id', asyncHandler(ContactController.getById));
router.patch('/:id/status', asyncHandler(ContactController.updateStatus));
router.delete('/:id', asyncHandler(ContactController.remove));

module.exports = router;
