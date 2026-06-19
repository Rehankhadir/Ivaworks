const { pool } = require('../config/db');
const { formatDate } = require('../utils/formatters');

function mapInquiryRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    companyName: row.company_name,
    contactPerson: row.contact_person,
    phone: row.phone,
    email: row.email,
    industry: row.industry,
    numEmployees: row.num_employees,
    jobDescription: row.job_description,
    location: row.location,
    status: row.status,
    createdAt: formatDate(row.created_at),
    updatedAt: formatDate(row.updated_at),
  };
}

async function findAll({ status, search, limit = 50, offset = 0 } = {}) {
  const conditions = [];
  const params = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (search) {
    conditions.push('(company_name LIKE ? OR contact_person LIKE ? OR email LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.execute(
    `SELECT * FROM contact_inquiries ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total FROM contact_inquiries ${where}`,
    params
  );

  return {
    inquiries: rows.map(mapInquiryRow),
    total: countRows[0].total,
  };
}

async function findById(id) {
  const [rows] = await pool.execute('SELECT * FROM contact_inquiries WHERE id = ? LIMIT 1', [id]);
  return mapInquiryRow(rows[0]);
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO contact_inquiries
      (company_name, contact_person, phone, email, industry, num_employees, job_description, location, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [
      data.companyName,
      data.contactPerson,
      data.phone,
      data.email,
      data.industry,
      data.numEmployees,
      data.jobDescription,
      data.location,
    ]
  );
  return findById(result.insertId);
}

async function updateStatus(id, status) {
  await pool.execute('UPDATE contact_inquiries SET status = ? WHERE id = ?', [status, id]);
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM contact_inquiries WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function countAll() {
  const [rows] = await pool.execute(
    `SELECT
       COUNT(*) AS total,
       SUM(status = 'new') AS new_count,
       SUM(status = 'reviewed') AS reviewed,
       SUM(status = 'contacted') AS contacted,
       SUM(status = 'closed') AS closed
     FROM contact_inquiries`
  );
  return {
    total: Number(rows[0].total),
    new: Number(rows[0].new_count),
    reviewed: Number(rows[0].reviewed),
    contacted: Number(rows[0].contacted),
    closed: Number(rows[0].closed),
  };
}

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  remove,
  countAll,
  mapInquiryRow,
};
