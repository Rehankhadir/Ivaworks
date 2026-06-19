const JobService = require('../services/job.service');
const { success, created, paginated } = require('../utils/response');

async function list(req, res) {
  const result = await JobService.listJobs(req.query);
  return paginated(res, {
    message: 'Jobs retrieved',
    data: result.jobs,
    pagination: result.pagination,
  });
}

async function getById(req, res) {
  const job = await JobService.getJobById(req.params.id);
  return success(res, { message: 'Job retrieved', data: job });
}

async function getBySlug(req, res) {
  const job = await JobService.getJobBySlug(req.params.slug);
  return success(res, { message: 'Job retrieved', data: job });
}

async function create(req, res) {
  const job = await JobService.createJob(req.body);
  return created(res, { message: 'Job created', data: job });
}

async function update(req, res) {
  const job = await JobService.updateJob(req.params.id, req.body);
  return success(res, { message: 'Job updated', data: job });
}

async function remove(req, res) {
  await JobService.deleteJob(req.params.id);
  return success(res, { message: 'Job deleted' });
}

async function publish(req, res) {
  const job = await JobService.publishJob(req.params.id);
  return success(res, { message: 'Job published', data: job });
}

async function unpublish(req, res) {
  const job = await JobService.unpublishJob(req.params.id);
  return success(res, { message: 'Job unpublished', data: job });
}

module.exports = { list, getById, getBySlug, create, update, remove, publish, unpublish };
