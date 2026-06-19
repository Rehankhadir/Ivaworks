/**
 * Blog data access layer — all SQL for blogs lives here.
 */
const { pool } = require('../config/db');
const { parseJsonField, formatDate, formatBlogDate } = require('../utils/formatters');

function mapBlogRow(row, { publicView = false } = {}) {
  if (!row) return null;

  const base = {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    author: row.author,
    readTime: row.read_time,
    summary: row.summary,
    content: row.content,
    image: row.image,
    status: row.status,
    publishedAt: formatDate(row.published_at),
    createdAt: formatDate(row.created_at),
    updatedAt: formatDate(row.updated_at),
  };

  if (publicView) {
    return {
      id: String(row.id),
      title: row.title,
      slug: row.slug,
      category: row.category,
      date: formatBlogDate(row.published_at || row.created_at),
      author: row.author,
      readTime: row.read_time,
      summary: row.summary,
      content: row.content,
      image: row.image || '',
    };
  }

  return base;
}

async function findAll({ status, category, search, limit = 50, offset = 0 } = {}) {
  const conditions = [];
  const params = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  if (search) {
    conditions.push('(title LIKE ? OR author LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.execute(
    `SELECT * FROM blogs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total FROM blogs ${where}`,
    params
  );

  return {
    blogs: rows.map((row) => mapBlogRow(row)),
    total: countRows[0].total,
  };
}

async function findById(id) {
  const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ? LIMIT 1', [id]);
  return mapBlogRow(rows[0]);
}

async function findBySlug(slug, { publishedOnly = false, publicView = false } = {}) {
  const sql = publishedOnly
    ? 'SELECT * FROM blogs WHERE slug = ? AND status = ? LIMIT 1'
    : 'SELECT * FROM blogs WHERE slug = ? LIMIT 1';
  const params = publishedOnly ? [slug, 'published'] : [slug];
  const [rows] = await pool.execute(sql, params);
  return mapBlogRow(rows[0], { publicView });
}

async function slugExists(slug, excludeId = null) {
  const sql = excludeId
    ? 'SELECT id FROM blogs WHERE slug = ? AND id != ? LIMIT 1'
    : 'SELECT id FROM blogs WHERE slug = ? LIMIT 1';
  const params = excludeId ? [slug, excludeId] : [slug];
  const [rows] = await pool.execute(sql, params);
  return rows.length > 0;
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO blogs
      (title, slug, category, author, read_time, summary, content, image, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.slug,
      data.category,
      data.author,
      data.readTime,
      data.summary,
      data.content,
      data.image,
      data.status,
      data.publishedAt,
    ]
  );
  return findById(result.insertId);
}

async function update(id, data) {
  await pool.execute(
    `UPDATE blogs SET
      title = ?, slug = ?, category = ?, author = ?, read_time = ?,
      summary = ?, content = ?, image = ?, status = ?, published_at = ?
     WHERE id = ?`,
    [
      data.title,
      data.slug,
      data.category,
      data.author,
      data.readTime,
      data.summary,
      data.content,
      data.image,
      data.status,
      data.publishedAt,
      id,
    ]
  );
  return findById(id);
}

async function updateStatus(id, status, publishedAt) {
  await pool.execute(
    'UPDATE blogs SET status = ?, published_at = ? WHERE id = ?',
    [status, publishedAt, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM blogs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function countByStatus() {
  const [rows] = await pool.execute(
    `SELECT
       COUNT(*) AS total,
       SUM(status = 'published') AS published,
       SUM(status = 'draft') AS draft
     FROM blogs`
  );
  return {
    total: Number(rows[0].total),
    published: Number(rows[0].published),
    draft: Number(rows[0].draft),
  };
}

module.exports = {
  findAll,
  findById,
  findBySlug,
  slugExists,
  create,
  update,
  updateStatus,
  remove,
  countByStatus,
  mapBlogRow,
};
