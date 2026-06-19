const { Router } = require('express');
const JobController = require('../controllers/job.controller');
const { authenticate } = require('../middleware/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(JobController.list));
router.get('/slug/:slug', asyncHandler(JobController.getBySlug));
router.get('/:id', asyncHandler(JobController.getById));
router.post('/', asyncHandler(JobController.create));
router.put('/:id', asyncHandler(JobController.update));
router.delete('/:id', asyncHandler(JobController.remove));
router.patch('/:id/publish', asyncHandler(JobController.publish));
router.patch('/:id/unpublish', asyncHandler(JobController.unpublish));

module.exports = router;
