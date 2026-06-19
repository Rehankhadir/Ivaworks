const ApplicationService = require('../services/application.service');
const { success, created, paginated } = require('../utils/response');

async function list(req, res) {
  const result = await ApplicationService.listApplications(req.query);
  return paginated(res, {
    message: 'Applications retrieved',
    data: result.applications,
    pagination: result.pagination,
  });
}

async function getById(req, res) {
  const application = await ApplicationService.getApplicationById(req.params.id);
  return success(res, { message: 'Application retrieved', data: application });
}

async function submit(req, res) {
  const application = await ApplicationService.submitApplication(req.body, req.file);
  return created(res, { message: 'Application submitted successfully', data: application });
}

async function updateStatus(req, res) {
  const application = await ApplicationService.updateApplicationStatus(req.params.id, req.body.status);
  return success(res, { message: 'Application status updated', data: application });
}

async function remove(req, res) {
  await ApplicationService.deleteApplication(req.params.id);
  return success(res, { message: 'Application deleted' });
}

module.exports = { list, getById, submit, updateStatus, remove };
