const { Router } = require('express');
const BlogController = require('../controllers/blog.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(BlogController.list));
router.get('/slug/:slug', asyncHandler(BlogController.getBySlug));
router.get('/:id', asyncHandler(BlogController.getById));
router.post('/', upload.single('image'), asyncHandler(BlogController.create));
router.put('/:id', upload.single('image'), asyncHandler(BlogController.update));
router.delete('/:id', asyncHandler(BlogController.remove));
router.patch('/:id/publish', asyncHandler(BlogController.publish));
router.patch('/:id/unpublish', asyncHandler(BlogController.unpublish));

module.exports = router;
