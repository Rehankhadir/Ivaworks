const AppError = require('../utils/AppError');

const APPLICATION_STATUSES = ['new', 'reviewed', 'shortlisted', 'rejected'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateApplicationBody(body, { requireResume = true } = {}) {
  const errors = [];
  const data = {};

  if (!isNonEmptyString(body.fullName)) errors.push({ field: 'fullName', message: 'Full name is required' });
  if (!isNonEmptyString(body.email) || !/\S+@\S+\.\S+/.test(body.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!isNonEmptyString(body.phone)) errors.push({ field: 'phone', message: 'Phone is required' });
  if (!isNonEmptyString(body.address)) errors.push({ field: 'address', message: 'Address is required' });
  if (!isNonEmptyString(body.qualification)) errors.push({ field: 'qualification', message: 'Qualification is required' });
  if (!isNonEmptyString(body.experience)) errors.push({ field: 'experience', message: 'Experience is required' });
  if (!isNonEmptyString(body.skills)) errors.push({ field: 'skills', message: 'Skills are required' });

  const pan = body.panNumber?.trim().toUpperCase();
  if (!pan) errors.push({ field: 'panNumber', message: 'PAN number is required' });
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
    errors.push({ field: 'panNumber', message: 'Invalid PAN number format' });
  }

  if (!isNonEmptyString(body.applyingFor)) {
    errors.push({ field: 'applyingFor', message: 'Applying for role is required' });
  }

  const applicationType = body.applicationType === 'job' ? 'job' : 'general';
  let jobId = null;
  if (body.jobId !== undefined && body.jobId !== null && body.jobId !== '') {
    jobId = parseInt(body.jobId, 10);
    if (Number.isNaN(jobId)) errors.push({ field: 'jobId', message: 'Invalid job ID' });
  }

  if (requireResume && !body.hasResume) {
    errors.push({ field: 'resume', message: 'Resume upload is required' });
  }

  if (errors.length) throw new AppError('Validation failed', 422, errors);

  return {
    jobId,
    applyingFor: body.applyingFor.trim(),
    applicationType,
    fullName: body.fullName.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    address: body.address.trim(),
    qualification: body.qualification.trim(),
    experience: body.experience.trim(),
    skills: body.skills.trim(),
    panNumber: pan,
    noticePeriod: body.noticePeriod?.trim() || null,
    linkedin: body.linkedin?.trim() || null,
  };
}

function validateApplicationStatus(status) {
  if (!APPLICATION_STATUSES.includes(status)) {
    throw new AppError('Invalid application status', 422);
  }
  return status;
}

module.exports = { validateApplicationBody, validateApplicationStatus, APPLICATION_STATUSES };
