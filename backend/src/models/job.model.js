/**
 * Job data access layer — all SQL for jobs lives here.
 */
const { pool } = require('../config/db');
const { parseJsonField, formatDate } = require('../utils/formatters');

function mapJobRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    type: row.type,
    location: row.location,
    experience: row.experience,
    description: row.description,
    skills: parseJsonField(row.skills, []),
    responsibilities: parseJsonField(row.responsibilities, []),
    requirements: parseJsonField(row.requirements, []),
    whatWeOffer: parseJsonField(row.what_we_offer, []),
    status: row.status,
    publishedAt: formatDate(row.published_at),
    createdAt: formatDate(row.created_at),
    updatedAt: formatDate(row.updated_at),
  };
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
    conditions.push('(title LIKE ? OR location LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.execute(
    `SELECT * FROM jobs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total FROM jobs ${where}`,
    params
  );

  return {
    jobs: rows.map(mapJobRow),
    total: countRows[0].total,
  };
}

async function findById(id) {
  const [rows] = await pool.execute('SELECT * FROM jobs WHERE id = ? LIMIT 1', [id]);
  return mapJobRow(rows[0]);
}

async function findBySlug(slug, { publishedOnly = false } = {}) {
  const sql = publishedOnly
    ? 'SELECT * FROM jobs WHERE slug = ? AND status = ? LIMIT 1'
    : 'SELECT * FROM jobs WHERE slug = ? LIMIT 1';
  const params = publishedOnly ? [slug, 'published'] : [slug];
  const [rows] = await pool.execute(sql, params);
  return mapJobRow(rows[0]);
}

async function slugExists(slug, excludeId = null) {
  const sql = excludeId
    ? 'SELECT id FROM jobs WHERE slug = ? AND id != ? LIMIT 1'
    : 'SELECT id FROM jobs WHERE slug = ? LIMIT 1';
  const params = excludeId ? [slug, excludeId] : [slug];
  const [rows] = await pool.execute(sql, params);
  return rows.length > 0;
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO jobs
      (title, slug, category, type, location, experience, description,
       skills, responsibilities, requirements, what_we_offer, status, published_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.slug,
      data.category,
      data.type,
      data.location,
      data.experience,
      data.description,
      JSON.stringify(data.skills),
      JSON.stringify(data.responsibilities),
      JSON.stringify(data.requirements),
      JSON.stringify(data.whatWeOffer),
      data.status,
      data.publishedAt,
    ]
  );
  return findById(result.insertId);
}

async function update(id, data) {
  await pool.execute(
    `UPDATE jobs SET
      title = ?, slug = ?, category = ?, type = ?, location = ?,
      experience = ?, description = ?, skills = ?, responsibilities = ?,
      requirements = ?, what_we_offer = ?, status = ?, published_at = ?
     WHERE id = ?`,
    [
      data.title,
      data.slug,
      data.category,
      data.type,
      data.location,
      data.experience,
      data.description,
      JSON.stringify(data.skills),
      JSON.stringify(data.responsibilities),
      JSON.stringify(data.requirements),
      JSON.stringify(data.whatWeOffer),
      data.status,
      data.publishedAt,
      id,
    ]
  );
  return findById(id);
}

async function updateStatus(id, status, publishedAt) {
  await pool.execute(
    'UPDATE jobs SET status = ?, published_at = ? WHERE id = ?',
    [status, publishedAt, id]
  );
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM jobs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function countByStatus() {
  const [rows] = await pool.execute(
    `SELECT
       COUNT(*) AS total,
       SUM(status = 'published') AS published,
       SUM(status = 'draft') AS draft
     FROM jobs`
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
  mapJobRow,
};
