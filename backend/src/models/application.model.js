const { pool } = require('../config/db');
const { formatDate } = require('../utils/formatters');

function mapApplicationRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    jobId: row.job_id,
    applyingFor: row.applying_for,
    applicationType: row.application_type,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    qualification: row.qualification,
    experience: row.experience,
    skills: row.skills,
    panNumber: row.pan_number,
    noticePeriod: row.notice_period,
    linkedin: row.linkedin,
    resumePath: row.resume_path,
    resumeOriginalName: row.resume_original_name,
    status: row.status,
    createdAt: formatDate(row.created_at),
    updatedAt: formatDate(row.updated_at),
  };
}

async function findAll({ status, applicationType, search, limit = 50, offset = 0 } = {}) {
  const conditions = [];
  const params = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (applicationType) {
    conditions.push('application_type = ?');
    params.push(applicationType);
  }
  if (search) {
    conditions.push('(full_name LIKE ? OR email LIKE ? OR applying_for LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [rows] = await pool.execute(
    `SELECT * FROM job_applications ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [countRows] = await pool.execute(
    `SELECT COUNT(*) AS total FROM job_applications ${where}`,
    params
  );

  return {
    applications: rows.map(mapApplicationRow),
    total: Number(countRows[0].total) || 0,
  };
}

async function findById(id) {
  const [rows] = await pool.execute('SELECT * FROM job_applications WHERE id = ? LIMIT 1', [id]);
  return mapApplicationRow(rows[0]);
}

async function create(data) {
  const [result] = await pool.execute(
    `INSERT INTO job_applications
      (job_id, applying_for, application_type, full_name, email, phone, address,
       qualification, experience, skills, pan_number, notice_period, linkedin,
       resume_path, resume_original_name, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [
      data.jobId,
      data.applyingFor,
      data.applicationType,
      data.fullName,
      data.email,
      data.phone,
      data.address,
      data.qualification,
      data.experience,
      data.skills,
      data.panNumber,
      data.noticePeriod,
      data.linkedin,
      data.resumePath,
      data.resumeOriginalName,
    ]
  );
  return findById(result.insertId);
}

async function updateStatus(id, status) {
  await pool.execute('UPDATE job_applications SET status = ? WHERE id = ?', [status, id]);
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM job_applications WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function countAll() {
  const [rows] = await pool.execute(
    `SELECT
       COUNT(*) AS total,
       SUM(status = 'new') AS new_count,
       SUM(status = 'reviewed') AS reviewed,
       SUM(status = 'shortlisted') AS shortlisted,
       SUM(status = 'rejected') AS rejected
     FROM job_applications`
  );
  return {
    total: Number(rows[0].total) || 0,
    new: Number(rows[0].new_count) || 0,
    reviewed: Number(rows[0].reviewed) || 0,
    shortlisted: Number(rows[0].shortlisted) || 0,
    rejected: Number(rows[0].rejected) || 0,
  };
}

module.exports = {
  findAll,
  findById,
  create,
  updateStatus,
  remove,
  countAll,
  mapApplicationRow,
};
