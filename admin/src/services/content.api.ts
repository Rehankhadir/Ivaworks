import type { JobListing, BlogPost } from '../types';
import { apiRequest, resolveAssetUrl } from './api';

interface ApiJob {
  id: number;
  title: string;
  slug: string;
  category: JobListing['category'];
  type: JobListing['type'];
  location: string;
  experience: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: JobListing['whatWeOffer'];
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiBlog {
  id: number;
  title: string;
  slug: string;
  category: BlogPost['category'];
  author: string;
  readTime: string;
  summary: string;
  content: string;
  image: string | null;
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function mapJobFromApi(job: ApiJob): JobListing {
  return {
    id: String(job.id),
    title: job.title,
    slug: job.slug,
    category: job.category,
    type: job.type,
    location: job.location,
    experience: job.experience,
    description: job.description,
    skills: job.skills,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    whatWeOffer: job.whatWeOffer,
    status: job.status,
  };
}

export function mapBlogFromApi(blog: ApiBlog): BlogPost {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return {
    id: String(blog.id),
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    date,
    author: blog.author,
    readTime: blog.readTime,
    summary: blog.summary,
    content: blog.content,
    image: resolveAssetUrl(blog.image),
    status: blog.status,
  };
}

export function toJobPayload(job: Omit<JobListing, 'id'>, status: 'draft' | 'published' = 'published') {
  return {
    title: job.title,
    category: job.category,
    type: job.type,
    location: job.location,
    experience: job.experience,
    description: job.description,
    skills: job.skills,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    whatWeOffer: job.whatWeOffer,
    status,
  };
}

export function toBlogPayload(blog: Omit<BlogPost, 'id'>, status: 'draft' | 'published' = 'published') {
  return {
    title: blog.title,
    category: blog.category,
    author: blog.author,
    readTime: blog.readTime,
    summary: blog.summary,
    content: blog.content,
    image: blog.image,
    status,
  };
}

export async function loginRequest(username: string, password: string) {
  const response = await apiRequest<{
    token: string;
    admin: { id: number; username: string; email: string; role: string };
  }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  return response.data;
}

export async function fetchJobs(params?: { search?: string; status?: string }) {
  const query = new URLSearchParams({ limit: '100' });
  if (params?.search) query.set('search', params.search);
  if (params?.status) query.set('status', params.status);

  const response = await apiRequest<ApiJob[]>(`/jobs?${query.toString()}`);
  return response.data.map(mapJobFromApi);
}

export async function createJob(job: Omit<JobListing, 'id'>) {
  const response = await apiRequest<ApiJob>('/jobs', {
    method: 'POST',
    body: JSON.stringify(toJobPayload(job, 'published')),
  });
  return mapJobFromApi(response.data);
}

export async function updateJob(id: string, job: Omit<JobListing, 'id'>, status?: 'draft' | 'published') {
  const response = await apiRequest<ApiJob>(`/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toJobPayload(job, status ?? job.status ?? 'published')),
  });
  return mapJobFromApi(response.data);
}

export async function deleteJob(id: string) {
  await apiRequest(`/jobs/${id}`, { method: 'DELETE' });
}

export async function publishJob(id: string) {
  const response = await apiRequest<ApiJob>(`/jobs/${id}/publish`, { method: 'PATCH' });
  return mapJobFromApi(response.data);
}

export async function unpublishJob(id: string) {
  const response = await apiRequest<ApiJob>(`/jobs/${id}/unpublish`, { method: 'PATCH' });
  return mapJobFromApi(response.data);
}

export async function fetchBlogs(params?: { search?: string; status?: string }) {
  const query = new URLSearchParams({ limit: '100' });
  if (params?.search) query.set('search', params.search);
  if (params?.status) query.set('status', params.status);

  const response = await apiRequest<ApiBlog[]>(`/blogs?${query.toString()}`);
  return response.data.map(mapBlogFromApi);
}

export async function createBlog(blog: Omit<BlogPost, 'id'>) {
  const response = await apiRequest<ApiBlog>('/blogs', {
    method: 'POST',
    body: JSON.stringify(toBlogPayload(blog, 'published')),
  });
  return mapBlogFromApi(response.data);
}

export async function updateBlog(id: string, blog: Omit<BlogPost, 'id'>, status?: 'draft' | 'published') {
  const response = await apiRequest<ApiBlog>(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toBlogPayload(blog, status ?? blog.status ?? 'published')),
  });
  return mapBlogFromApi(response.data);
}

export async function deleteBlog(id: string) {
  await apiRequest(`/blogs/${id}`, { method: 'DELETE' });
}

export async function publishBlog(id: string) {
  const response = await apiRequest<ApiBlog>(`/blogs/${id}/publish`, { method: 'PATCH' });
  return mapBlogFromApi(response.data);
}

export async function unpublishBlog(id: string) {
  const response = await apiRequest<ApiBlog>(`/blogs/${id}/unpublish`, { method: 'PATCH' });
  return mapBlogFromApi(response.data);
}

export interface DashboardStats {
  jobs: { total: number; published: number; draft: number };
  blogs: { total: number; published: number; draft: number };
  applications: { total: number; new: number; reviewed: number; shortlisted: number; rejected: number };
  inquiries: { total: number; new: number; reviewed: number; contacted: number; closed: number };
  summary: {
    totalJobs: number;
    totalBlogs: number;
    publishedJobs: number;
    draftJobs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalApplications: number;
    newApplications: number;
    totalInquiries: number;
    newInquiries: number;
  };
}

export interface JobApplication {
  id: number;
  jobId: number | null;
  applyingFor: string;
  applicationType: 'job' | 'general';
  fullName: string;
  email: string;
  phone: string;
  address: string;
  qualification: string;
  experience: string;
  skills: string;
  panNumber: string;
  noticePeriod: string | null;
  linkedin: string | null;
  resumePath: string;
  resumeOriginalName: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt: string;
}

export interface ContactInquiry {
  id: number;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  industry: string;
  numEmployees: string;
  jobDescription: string;
  location: string;
  status: 'new' | 'reviewed' | 'contacted' | 'closed';
  createdAt: string;
}

export async function fetchApplications() {
  const response = await apiRequest<JobApplication[]>('/applications?limit=100');
  return response.data;
}

export async function updateApplicationStatus(id: number, status: JobApplication['status']) {
  const response = await apiRequest<JobApplication>(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return response.data;
}

export async function deleteApplication(id: number) {
  await apiRequest(`/applications/${id}`, { method: 'DELETE' });
}

export async function fetchContactInquiries() {
  const response = await apiRequest<ContactInquiry[]>('/contact-inquiries?limit=100');
  return response.data;
}

export async function updateInquiryStatus(id: number, status: ContactInquiry['status']) {
  const response = await apiRequest<ContactInquiry>(`/contact-inquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return response.data;
}

export async function deleteInquiry(id: number) {
  await apiRequest(`/contact-inquiries/${id}`, { method: 'DELETE' });
}

export async function fetchDashboardStats() {
  const response = await apiRequest<DashboardStats>('/dashboard/stats');
  return response.data;
}
