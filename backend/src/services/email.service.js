/**
 * Sends admin notification emails for form submissions (applications & inquiries).
 * Failures are logged only — they never block the API response or DB save.
 */
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter;

function isConfigured() {
  return Boolean(
    env.email.enabled &&
      env.email.notifyTo &&
      env.email.smtp.host &&
      env.email.smtp.user &&
      env.email.smtp.pass
  );
}

function getTransporter() {
  if (!transporter && isConfigured()) {
    transporter = nodemailer.createTransport({
      host: env.email.smtp.host,
      port: env.email.smtp.port,
      secure: env.email.smtp.secure,
      auth: {
        user: env.email.smtp.user,
        pass: env.email.smtp.pass,
      },
      tls: {
        rejectUnauthorized: env.email.smtp.tlsRejectUnauthorized,
      },
    });
  }
  return transporter;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label, value) {
  return `<tr>
    <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc;width:200px;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">${escapeHtml(value || '—')}</td>
  </tr>`;
}

function buildTable(rows) {
  return `<table style="border-collapse:collapse;width:100%;max-width:640px;font-family:Arial,sans-serif;font-size:14px;color:#1e293b">${rows.join('')}</table>`;
}

function wrapEmail(title, bodyHtml) {
  return `
    <div style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.5;max-width:680px">
      <h2 style="margin:0 0 16px;font-size:20px;color:#0f172a">${escapeHtml(title)}</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:13px">Submitted via the IVA Works website. A copy is also stored in the admin dashboard.</p>
      ${bodyHtml}
    </div>
  `;
}

async function sendMail({ subject, html, text, attachments = [] }) {
  if (!isConfigured()) {
    console.warn('[email] Notification skipped — configure SMTP_* and NOTIFY_EMAIL in .env');
    return false;
  }

  const transport = getTransporter();
  await transport.sendMail({
    from: env.email.from,
    to: env.email.notifyTo,
    subject,
    html,
    text,
    attachments,
  });

  return true;
}

function applicationTypeLabel(type) {
  return type === 'job' ? 'Job Application (Apply Now)' : 'General Talent Application';
}

async function sendApplicationNotification(application, resumeFilePath) {
  const title = applicationTypeLabel(application.applicationType);
  const role = application.applyingFor?.trim() || 'Unknown Role';
  const subject =
    application.applicationType === 'job'
      ? `[IVA Works] Apply Now: ${role} — ${application.fullName}`
      : `[IVA Works] General Application: ${role} — ${application.fullName}`;

  const fields = [
    ['Submission Type', title],
    ['Applying For', application.applyingFor],
    ['Full Name', application.fullName],
    ['Email', application.email],
    ['Phone', application.phone],
    ['Address', application.address],
    ['Qualification', application.qualification],
    ['Experience', application.experience],
    ['Skills', application.skills],
    ['PAN Number', application.panNumber],
    ['Notice Period', application.noticePeriod],
    ['LinkedIn', application.linkedin],
    ['Submitted At', application.createdAt],
  ];

  const html = wrapEmail(`${title}: ${role}`, buildTable(fields.map(([label, value]) => row(label, value))));

  const text = [`${title}: ${role}`, '', ...fields.map(([label, value]) => `${label}: ${value || '—'}`)].join('\n');

  const attachments = [];
  if (resumeFilePath && fs.existsSync(resumeFilePath)) {
    attachments.push({
      filename: application.resumeOriginalName || path.basename(resumeFilePath),
      path: resumeFilePath,
    });
  }

  return sendMail({ subject, html, text, attachments });
}

async function sendInquiryNotification(inquiry) {
  const subject = `[IVA Works] New Employer Inquiry: ${inquiry.companyName}`;

  const rows = [
    row('Company Name', inquiry.companyName),
    row('Contact Person', inquiry.contactPerson),
    row('Email', inquiry.email),
    row('Phone', inquiry.phone),
    row('Industry', inquiry.industry),
    row('Company Size', inquiry.numEmployees),
    row('Location', inquiry.location),
    row('Staffing Requirements', inquiry.jobDescription),
    row('Submitted At', inquiry.createdAt),
  ];

  const html = wrapEmail('New Employer Inquiry', buildTable(rows));

  const text = [
    'New Employer Inquiry',
    '',
    `Company Name: ${inquiry.companyName || '—'}`,
    `Contact Person: ${inquiry.contactPerson || '—'}`,
    `Email: ${inquiry.email || '—'}`,
    `Phone: ${inquiry.phone || '—'}`,
    `Industry: ${inquiry.industry || '—'}`,
    `Company Size: ${inquiry.numEmployees || '—'}`,
    `Location: ${inquiry.location || '—'}`,
    `Staffing Requirements: ${inquiry.jobDescription || '—'}`,
    `Submitted At: ${inquiry.createdAt || '—'}`,
  ].join('\n');

  return sendMail({ subject, html, text });
}

module.exports = {
  isConfigured,
  sendApplicationNotification,
  sendInquiryNotification,
};
