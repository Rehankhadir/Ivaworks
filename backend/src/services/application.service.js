const ApplicationModel = require('../models/application.model');
const JobModel = require('../models/job.model');
const AppError = require('../utils/AppError');
const EmailService = require('./email.service');
const { validateApplicationBody, validateApplicationStatus } = require('../validations/application.validation');
const path = require('path');
const { uploadDir } = require('../middleware/resume.middleware');

async function listApplications(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { applications, total } = await ApplicationModel.findAll({
    status: query.status,
    applicationType: query.type,
    search: query.search,
    limit,
    offset,
  });

  return {
    applications,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

async function getApplicationById(id) {
  const application = await ApplicationModel.findById(id);
  if (!application) throw new AppError('Application not found', 404);
  return application;
}

async function submitApplication(body, file) {
  if (!file) throw new AppError('Resume file is required', 422);

  const data = validateApplicationBody({ ...body, hasResume: true });

  if (data.applicationType === 'job' && data.jobId) {
    const job = await JobModel.findById(data.jobId);
    if (!job || job.status !== 'published') {
      throw new AppError('Job not found or not accepting applications', 404);
    }
  } else if (data.applicationType === 'job' && !data.jobId) {
    throw new AppError('Job ID is required for job-specific applications', 422);
  }

  const application = await ApplicationModel.create({
    ...data,
    resumePath: `/uploads/resumes/${file.filename}`,
    resumeOriginalName: file.originalname,
  });

  EmailService.sendApplicationNotification(application, path.join(uploadDir, file.filename)).catch((err) => {
    console.error('[email] Application notification failed:', err.message);
  });

  return application;
}

async function updateApplicationStatus(id, status) {
  await getApplicationById(id);
  const validStatus = validateApplicationStatus(status);
  return ApplicationModel.updateStatus(id, validStatus);
}

async function deleteApplication(id) {
  await getApplicationById(id);
  const deleted = await ApplicationModel.remove(id);
  if (!deleted) throw new AppError('Failed to delete application', 500);
  return { id };
}

module.exports = {
  listApplications,
  getApplicationById,
  submitApplication,
  updateApplicationStatus,
  deleteApplication,
};
