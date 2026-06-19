const BlogService = require('../services/blog.service');
const { success, created, paginated } = require('../utils/response');

async function list(req, res) {
  const result = await BlogService.listBlogs(req.query);
  return paginated(res, {
    message: 'Blogs retrieved',
    data: result.blogs,
    pagination: result.pagination,
  });
}

async function getById(req, res) {
  const blog = await BlogService.getBlogById(req.params.id);
  return success(res, { message: 'Blog retrieved', data: blog });
}

async function getBySlug(req, res) {
  const blog = await BlogService.getBlogBySlug(req.params.slug);
  return success(res, { message: 'Blog retrieved', data: blog });
}

async function create(req, res) {
  const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : null;
  const blog = await BlogService.createBlog(req.body, imagePath);
  return created(res, { message: 'Blog created', data: blog });
}

async function update(req, res) {
  const imagePath = req.file ? `/uploads/blogs/${req.file.filename}` : null;
  const blog = await BlogService.updateBlog(req.params.id, req.body, imagePath);
  return success(res, { message: 'Blog updated', data: blog });
}

async function remove(req, res) {
  await BlogService.deleteBlog(req.params.id);
  return success(res, { message: 'Blog deleted' });
}

async function publish(req, res) {
  const blog = await BlogService.publishBlog(req.params.id);
  return success(res, { message: 'Blog published', data: blog });
}

async function unpublish(req, res) {
  const blog = await BlogService.unpublishBlog(req.params.id);
  return success(res, { message: 'Blog unpublished', data: blog });
}

module.exports = { list, getById, getBySlug, create, update, remove, publish, unpublish };
