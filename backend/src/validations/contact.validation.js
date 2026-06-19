const AppError = require('../utils/AppError');

const INQUIRY_STATUSES = ['new', 'reviewed', 'contacted', 'closed'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateContactBody(body) {
  const errors = [];

  if (!isNonEmptyString(body.companyName)) errors.push({ field: 'companyName', message: 'Company name is required' });
  if (!isNonEmptyString(body.contactPerson)) errors.push({ field: 'contactPerson', message: 'Contact person is required' });
  if (!isNonEmptyString(body.phone)) errors.push({ field: 'phone', message: 'Phone is required' });
  if (!isNonEmptyString(body.email) || !/\S+@\S+\.\S+/.test(body.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!isNonEmptyString(body.industry)) errors.push({ field: 'industry', message: 'Industry is required' });
  if (!isNonEmptyString(body.numEmployees)) errors.push({ field: 'numEmployees', message: 'Number of employees is required' });
  if (!isNonEmptyString(body.jobDescription)) errors.push({ field: 'jobDescription', message: 'Job description is required' });
  if (!isNonEmptyString(body.location)) errors.push({ field: 'location', message: 'Location is required' });

  if (errors.length) throw new AppError('Validation failed', 422, errors);

  return {
    companyName: body.companyName.trim(),
    contactPerson: body.contactPerson.trim(),
    phone: body.phone.trim(),
    email: body.email.trim(),
    industry: body.industry.trim(),
    numEmployees: body.numEmployees.trim(),
    jobDescription: body.jobDescription.trim(),
    location: body.location.trim(),
  };
}

function validateInquiryStatus(status) {
  if (!INQUIRY_STATUSES.includes(status)) {
    throw new AppError('Invalid inquiry status', 422);
  }
  return status;
}

module.exports = { validateContactBody, validateInquiryStatus, INQUIRY_STATUSES };
