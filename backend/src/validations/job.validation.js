const AppError = require('../utils/AppError');

const JOB_CATEGORIES = ['Consulting', 'Staffing', 'Technology'];
const JOB_TYPES = ['Full-time', 'Contract', 'Remote', 'Part-time'];
const JOB_STATUSES = ['draft', 'published'];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isWhatWeOfferArray(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        isNonEmptyString(item.title) &&
        isNonEmptyString(item.desc)
    )
  );
}

function validateJobPayload(body, { partial = false } = {}) {
  const errors = [];
  const data = {};

  const check = (field, condition, message) => {
    if (partial && body[field] === undefined) return;
    if (!condition) errors.push({ field, message });
  };

  check('title', isNonEmptyString(body.title), 'Title is required');
  check('category', JOB_CATEGORIES.includes(body.category), 'Invalid category');
  check('type', JOB_TYPES.includes(body.type), 'Invalid job type');
  check('location', isNonEmptyString(body.location), 'Location is required');
  check('experience', isNonEmptyString(body.experience), 'Experience is required');
  check('description', isNonEmptyString(body.description), 'Description is required');
  check('skills', isStringArray(body.skills), 'Skills must be an array of strings');
  check(
    'responsibilities',
    isStringArray(body.responsibilities),
    'Responsibilities must be an array of strings'
  );
  check(
    'requirements',
    isStringArray(body.requirements),
    'Requirements must be an array of strings'
  );
  check(
    'whatWeOffer',
    isWhatWeOfferArray(body.whatWeOffer),
    'whatWeOffer must be an array of { title, desc } objects'
  );

  if (body.status !== undefined && !JOB_STATUSES.includes(body.status)) {
    errors.push({ field: 'status', message: 'Status must be draft or published' });
  }

  if (body.slug !== undefined && body.slug !== null && typeof body.slug !== 'string') {
    errors.push({ field: 'slug', message: 'Slug must be a string' });
  }

  if (errors.length) {
    throw new AppError('Validation failed', 422, errors);
  }

  if (body.title !== undefined) data.title = body.title.trim();
  if (body.slug !== undefined) data.slug = body.slug?.trim() || null;
  if (body.category !== undefined) data.category = body.category;
  if (body.type !== undefined) data.type = body.type;
  if (body.location !== undefined) data.location = body.location.trim();
  if (body.experience !== undefined) data.experience = body.experience.trim();
  if (body.description !== undefined) data.description = body.description.trim();
  if (body.skills !== undefined) data.skills = body.skills;
  if (body.responsibilities !== undefined) data.responsibilities = body.responsibilities;
  if (body.requirements !== undefined) data.requirements = body.requirements;
  if (body.whatWeOffer !== undefined) data.whatWeOffer = body.whatWeOffer;
  if (body.status !== undefined) data.status = body.status;

  return data;
}

module.exports = { validateJobPayload, JOB_CATEGORIES, JOB_TYPES, JOB_STATUSES };
