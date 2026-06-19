const { Router } = require('express');
const PublicController = require('../controllers/public.controller');
const ApplicationController = require('../controllers/application.controller');
const ContactController = require('../controllers/contact.controller');
const { uploadResume } = require('../middleware/resume.middleware');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.get('/jobs', asyncHandler(PublicController.listPublishedJobs));
router.get('/jobs/:slug', asyncHandler(PublicController.getPublishedJobBySlug));
router.get('/blogs', asyncHandler(PublicController.listPublishedBlogs));
router.get('/blogs/:slug', asyncHandler(PublicController.getPublishedBlogBySlug));

router.post('/applications', uploadResume.single('resume'), asyncHandler(ApplicationController.submit));
router.post('/contact', asyncHandler(ContactController.submit));

module.exports = router;
