/**
 * Blog business logic — slug generation, publish workflow, image path handling.
 */
const BlogModel = require('../models/blog.model');
const { slugify } = require('../utils/slugify');
const AppError = require('../utils/AppError');
const { validateBlogPayload } = require('../validations/blog.validation');

async function generateUniqueSlug(title, excludeId = null) {
  let base = slugify(title);
  if (!base) base = 'blog';

  let slug = base;
  let counter = 1;

  while (await BlogModel.slugExists(slug, excludeId)) {
    counter += 1;
    slug = `${base}-${counter}`;
  }

  return slug;
}

async function listBlogs(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { blogs, total } = await BlogModel.findAll({
    status: query.status,
    category: query.category,
    search: query.search,
    limit,
    offset,
  });

  return {
    blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

const { formatBlogDate } = require('../utils/formatters');

async function listPublishedBlogs(query = {}) {
  const result = await listBlogs({ ...query, status: 'published' });
  return {
    ...result,
    blogs: result.blogs.map((blog) => ({
      id: String(blog.id),
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      date: formatBlogDate(blog.publishedAt || blog.createdAt),
      author: blog.author,
      readTime: blog.readTime,
      summary: blog.summary,
      content: blog.content,
      image: blog.image || '',
    })),
  };
}

async function getBlogById(id) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw new AppError('Blog not found', 404);
  return blog;
}

async function getBlogBySlug(slug, { publishedOnly = false, publicView = false } = {}) {
  const blog = await BlogModel.findBySlug(slug, { publishedOnly, publicView });
  if (!blog) throw new AppError('Blog not found', 404);
  return blog;
}

async function createBlog(body, imagePath = null) {
  const data = validateBlogPayload(body);
  const slug = data.slug ? slugify(data.slug) : await generateUniqueSlug(data.title);
  const status = data.status || 'draft';
  const publishedAt = status === 'published' ? new Date() : null;

  return BlogModel.create({
    ...data,
    slug,
    image: imagePath || data.image || null,
    status,
    publishedAt,
  });
}

async function updateBlog(id, body, imagePath = null) {
  const existing = await getBlogById(id);
  const data = validateBlogPayload(body, { partial: true });

  let slug = existing.slug;
  if (data.slug) {
    slug = slugify(data.slug);
  } else if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, id);
  }

  if (slug !== existing.slug && (await BlogModel.slugExists(slug, id))) {
    throw new AppError('Slug already exists', 409);
  }

  const status = data.status ?? existing.status;
  let publishedAt = existing.publishedAt ? new Date(existing.publishedAt) : null;

  if (status === 'published' && existing.status !== 'published') {
    publishedAt = new Date();
  } else if (status === 'draft') {
    publishedAt = null;
  }

  return BlogModel.update(id, {
    title: data.title ?? existing.title,
    slug,
    category: data.category ?? existing.category,
    author: data.author ?? existing.author,
    readTime: data.readTime ?? existing.readTime,
    summary: data.summary ?? existing.summary,
    content: data.content ?? existing.content,
    image: imagePath ?? data.image ?? existing.image,
    status,
    publishedAt,
  });
}

async function deleteBlog(id) {
  await getBlogById(id);
  const deleted = await BlogModel.remove(id);
  if (!deleted) throw new AppError('Failed to delete blog', 500);
  return { id };
}

async function publishBlog(id) {
  const blog = await getBlogById(id);
  if (blog.status === 'published') {
    throw new AppError('Blog is already published', 400);
  }
  return BlogModel.updateStatus(id, 'published', new Date());
}

async function unpublishBlog(id) {
  const blog = await getBlogById(id);
  if (blog.status === 'draft') {
    throw new AppError('Blog is already a draft', 400);
  }
  return BlogModel.updateStatus(id, 'draft', null);
}

module.exports = {
  listBlogs,
  listPublishedBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
};
