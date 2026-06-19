/**
 * Public API controller — read-only published content for the marketing website.
 */
const JobService = require('../services/job.service');
const BlogService = require('../services/blog.service');
const { success, paginated } = require('../utils/response');

async function listPublishedJobs(req, res) {
  const result = await JobService.listPublishedJobs(req.query);
  return paginated(res, {
    message: 'Published jobs retrieved',
    data: result.jobs,
    pagination: result.pagination,
  });
}

async function getPublishedJobBySlug(req, res) {
  const job = await JobService.getJobBySlug(req.params.slug, { publishedOnly: true });
  return success(res, { message: 'Job retrieved', data: job });
}

async function listPublishedBlogs(req, res) {
  const result = await BlogService.listPublishedBlogs(req.query);
  return paginated(res, {
    message: 'Published blogs retrieved',
    data: result.blogs,
    pagination: result.pagination,
  });
}

async function getPublishedBlogBySlug(req, res) {
  const blog = await BlogService.getBlogBySlug(req.params.slug, {
    publishedOnly: true,
    publicView: true,
  });
  return success(res, { message: 'Blog retrieved', data: blog });
}

module.exports = {
  listPublishedJobs,
  getPublishedJobBySlug,
  listPublishedBlogs,
  getPublishedBlogBySlug,
};
