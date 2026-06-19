import type { JobListing, BlogPost } from '../types';
import { publicRequest, resolveAssetUrl } from './api';

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
}

interface ApiBlog {
  id: string;
  title: string;
  slug: string;
  category: BlogPost['category'];
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
}

function mapJob(job: ApiJob): JobListing {
  return {
    id: String(job.id),
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
  };
}

function mapBlog(blog: ApiBlog): BlogPost {
  return {
    id: String(blog.id),
    title: blog.title,
    category: blog.category,
    date: blog.date,
    author: blog.author,
    readTime: blog.readTime,
    summary: blog.summary,
    content: blog.content,
    image: resolveAssetUrl(blog.image),
  };
}

export async function fetchPublishedJobs(): Promise<JobListing[]> {
  const jobs = await publicRequest<ApiJob[]>('/public/jobs?limit=100');
  return jobs.map(mapJob);
}

export async function fetchPublishedBlogs(): Promise<BlogPost[]> {
  const blogs = await publicRequest<ApiBlog[]>('/public/blogs?limit=100');
  return blogs.map(mapBlog);
}

export interface JobApplicationPayload {
  jobId?: string;
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
  noticePeriod?: string;
  linkedin?: string;
  resume: File;
}

export interface ContactInquiryPayload {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  industry: string;
  numEmployees: string;
  jobDescription: string;
  location: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export async function submitJobApplication(payload: JobApplicationPayload): Promise<void> {
  const formData = new FormData();
  if (payload.jobId) formData.append('jobId', payload.jobId);
  formData.append('applyingFor', payload.applyingFor);
  formData.append('applicationType', payload.applicationType);
  formData.append('fullName', payload.fullName);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  formData.append('address', payload.address);
  formData.append('qualification', payload.qualification);
  formData.append('experience', payload.experience);
  formData.append('skills', payload.skills);
  formData.append('panNumber', payload.panNumber);
  if (payload.noticePeriod) formData.append('noticePeriod', payload.noticePeriod);
  if (payload.linkedin) formData.append('linkedin', payload.linkedin);
  formData.append('resume', payload.resume);

  const response = await fetch(`${API_URL}/public/applications`, {
    method: 'POST',
    body: formData,
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message ?? 'Failed to submit application');
  }
}

export async function submitContactInquiry(payload: ContactInquiryPayload): Promise<void> {
  const response = await fetch(`${API_URL}/public/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message ?? 'Failed to submit inquiry');
  }
}
