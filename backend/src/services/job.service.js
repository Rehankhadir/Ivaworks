/**
 * Job business logic — slug generation, publish workflow, validation orchestration.
 */
const JobModel = require('../models/job.model');
const { slugify } = require('../utils/slugify');
const AppError = require('../utils/AppError');
const { validateJobPayload } = require('../validations/job.validation');

async function generateUniqueSlug(title, excludeId = null) {
  let base = slugify(title);
  if (!base) base = 'job';

  let slug = base;
  let counter = 1;

  while (await JobModel.slugExists(slug, excludeId)) {
    counter += 1;
    slug = `${base}-${counter}`;
  }

  return slug;
}

async function listJobs(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 20, 1), 100);
  const offset = (page - 1) * limit;

  const { jobs, total } = await JobModel.findAll({
    status: query.status,
    category: query.category,
    search: query.search,
    limit,
    offset,
  });

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function listPublishedJobs(query = {}) {
  return listJobs({ ...query, status: 'published' });
}

async function getJobById(id) {
  const job = await JobModel.findById(id);
  if (!job) throw new AppError('Job not found', 404);
  return job;
}

async function getJobBySlug(slug, { publishedOnly = false } = {}) {
  const job = await JobModel.findBySlug(slug, { publishedOnly });
  if (!job) throw new AppError('Job not found', 404);
  return job;
}

async function createJob(body) {
  const data = validateJobPayload(body);
  const slug = data.slug ? slugify(data.slug) : await generateUniqueSlug(data.title);
  const status = data.status || 'draft';
  const publishedAt = status === 'published' ? new Date() : null;

  return JobModel.create({
    ...data,
    slug,
    status,
    publishedAt,
  });
}

async function updateJob(id, body) {
  const existing = await getJobById(id);
  const data = validateJobPayload(body, { partial: true });

  let slug = existing.slug;
  if (data.slug) {
    slug = slugify(data.slug);
  } else if (data.title && data.title !== existing.title) {
    slug = await generateUniqueSlug(data.title, id);
  }

  if (slug !== existing.slug && (await JobModel.slugExists(slug, id))) {
    throw new AppError('Slug already exists', 409);
  }

  const status = data.status ?? existing.status;
  let publishedAt = existing.publishedAt ? new Date(existing.publishedAt) : null;

  if (status === 'published' && existing.status !== 'published') {
    publishedAt = new Date();
  } else if (status === 'draft') {
    publishedAt = null;
  }

  return JobModel.update(id, {
    title: data.title ?? existing.title,
    slug,
    category: data.category ?? existing.category,
    type: data.type ?? existing.type,
    location: data.location ?? existing.location,
    experience: data.experience ?? existing.experience,
    description: data.description ?? existing.description,
    skills: data.skills ?? existing.skills,
    responsibilities: data.responsibilities ?? existing.responsibilities,
    requirements: data.requirements ?? existing.requirements,
    whatWeOffer: data.whatWeOffer ?? existing.whatWeOffer,
    status,
    publishedAt,
  });
}

async function deleteJob(id) {
  await getJobById(id);
  const deleted = await JobModel.remove(id);
  if (!deleted) throw new AppError('Failed to delete job', 500);
  return { id };
}

async function publishJob(id) {
  const job = await getJobById(id);
  if (job.status === 'published') {
    throw new AppError('Job is already published', 400);
  }
  return JobModel.updateStatus(id, 'published', new Date());
}

async function unpublishJob(id) {
  const job = await getJobById(id);
  if (job.status === 'draft') {
    throw new AppError('Job is already a draft', 400);
  }
  return JobModel.updateStatus(id, 'draft', null);
}

module.exports = {
  listJobs,
  listPublishedJobs,
  getJobById,
  getJobBySlug,
  createJob,
  updateJob,
  deleteJob,
  publishJob,
  unpublishJob,
};
