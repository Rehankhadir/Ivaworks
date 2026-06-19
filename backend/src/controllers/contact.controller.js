const ContactService = require('../services/contact.service');
const { success, created, paginated } = require('../utils/response');

async function list(req, res) {
  const result = await ContactService.listInquiries(req.query);
  return paginated(res, {
    message: 'Inquiries retrieved',
    data: result.inquiries,
    pagination: result.pagination,
  });
}

async function getById(req, res) {
  const inquiry = await ContactService.getInquiryById(req.params.id);
  return success(res, { message: 'Inquiry retrieved', data: inquiry });
}

async function submit(req, res) {
  const inquiry = await ContactService.submitInquiry(req.body);
  return created(res, { message: 'Inquiry submitted successfully', data: inquiry });
}

async function updateStatus(req, res) {
  const inquiry = await ContactService.updateInquiryStatus(req.params.id, req.body.status);
  return success(res, { message: 'Inquiry status updated', data: inquiry });
}

async function remove(req, res) {
  await ContactService.deleteInquiry(req.params.id);
  return success(res, { message: 'Inquiry deleted' });
}

module.exports = { list, getById, submit, updateStatus, remove };
