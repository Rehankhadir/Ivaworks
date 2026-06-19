const ContactModel = require('../models/contact.model');
const AppError = require('../utils/AppError');
const EmailService = require('./email.service');
const { validateContactBody, validateInquiryStatus } = require('../validations/contact.validation');

async function listInquiries(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { inquiries, total } = await ContactModel.findAll({
    status: query.status,
    search: query.search,
    limit,
    offset,
  });

  return {
    inquiries,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

async function getInquiryById(id) {
  const inquiry = await ContactModel.findById(id);
  if (!inquiry) throw new AppError('Inquiry not found', 404);
  return inquiry;
}

async function submitInquiry(body) {
  const data = validateContactBody(body);
  const inquiry = await ContactModel.create(data);

  EmailService.sendInquiryNotification(inquiry).catch((err) => {
    console.error('[email] Inquiry notification failed:', err.message);
  });

  return inquiry;
}

async function updateInquiryStatus(id, status) {
  await getInquiryById(id);
  const validStatus = validateInquiryStatus(status);
  return ContactModel.updateStatus(id, validStatus);
}

async function deleteInquiry(id) {
  await getInquiryById(id);
  const deleted = await ContactModel.remove(id);
  if (!deleted) throw new AppError('Failed to delete inquiry', 500);
  return { id };
}

module.exports = {
  listInquiries,
  getInquiryById,
  submitInquiry,
  updateInquiryStatus,
  deleteInquiry,
};
