/**
 * Dashboard statistics — aggregates counts from jobs, blogs, applications, inquiries.
 */
const JobModel = require('../models/job.model');
const BlogModel = require('../models/blog.model');
const ApplicationModel = require('../models/application.model');
const ContactModel = require('../models/contact.model');

async function getStats() {
  const [jobs, blogs, applications, inquiries] = await Promise.all([
    JobModel.countByStatus(),
    BlogModel.countByStatus(),
    ApplicationModel.countAll(),
    ContactModel.countAll(),
  ]);

  return {
    jobs: {
      total: jobs.total,
      published: jobs.published,
      draft: jobs.draft,
    },
    blogs: {
      total: blogs.total,
      published: blogs.published,
      draft: blogs.draft,
    },
    applications: {
      total: applications.total,
      new: applications.new,
      reviewed: applications.reviewed,
      shortlisted: applications.shortlisted,
      rejected: applications.rejected,
    },
    inquiries: {
      total: inquiries.total,
      new: inquiries.new,
      reviewed: inquiries.reviewed,
      contacted: inquiries.contacted,
      closed: inquiries.closed,
    },
    summary: {
      totalJobs: jobs.total,
      totalBlogs: blogs.total,
      publishedJobs: jobs.published,
      draftJobs: jobs.draft,
      publishedBlogs: blogs.published,
      draftBlogs: blogs.draft,
      totalApplications: applications.total,
      newApplications: applications.new,
      totalInquiries: inquiries.total,
      newInquiries: inquiries.new,
    },
  };
}

module.exports = { getStats };
