const AppError = require('../utils/AppError');

const BLOG_CATEGORIES = ['Consulting', 'Staffing', 'Technology', 'Insights'];
const BLOG_STATUSES = ['draft', 'published'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateBlogPayload(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  const check = (field, condition, message) => {
    if (partial && body[field] === undefined) return;
    if (!condition) errors.push({ field, message });
  };

  check('title', isNonEmptyString(body.title), 'Title is required');
  check('category', BLOG_CATEGORIES.includes(body.category), 'Invalid category');
  check('author', isNonEmptyString(body.author), 'Author is required');
  check('readTime', isNonEmptyString(body.readTime), 'Read time is required');
  check('summary', isNonEmptyString(body.summary), 'Summary is required');
  check('content', isNonEmptyString(body.content), 'Content is required');

  if (body.image !== undefined && body.image !== null && typeof body.image !== 'string') {
    errors.push({ field: 'image', message: 'Image must be a string URL or path' });
  }

  if (body.status !== undefined && !BLOG_STATUSES.includes(body.status)) {
    errors.push({ field: 'status', message: 'Status must be draft or published' });
  }

  if (body.slug !== undefined && body.slug !== null && typeof body.slug !== 'string') {
    errors.push({ field: 'slug', message: 'Slug must be a string' });
  }

  if (errors.length) {
    throw new AppError('Validation failed', 422, errors);
  }

  if (body.title !== undefined) data.title = body.title.trim();
  if (body.slug !== undefined) data.slug = body.slug?.trim() || null;
  if (body.category !== undefined) data.category = body.category;
  if (body.author !== undefined) data.author = body.author.trim();
  if (body.readTime !== undefined) data.readTime = body.readTime.trim();
  if (body.summary !== undefined) data.summary = body.summary.trim();
  if (body.content !== undefined) data.content = body.content;
  if (body.image !== undefined) data.image = body.image || null;
  if (body.status !== undefined) data.status = body.status;

  return data;
}

module.exports = { validateBlogPayload, BLOG_CATEGORIES, BLOG_STATUSES };
