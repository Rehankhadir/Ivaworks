import { useEffect, useState } from 'react';
import { JOB_LISTINGS as DEFAULT_JOBS, BLOG_POSTS as DEFAULT_BLOGS } from '../data';
import { JobListing, BlogPost } from '../types';

const JOBS_STORAGE_KEY = 'iva_jobs_v1';
const BLOGS_STORAGE_KEY = 'iva_blogs_v1';

// Custom event for cross-component sync
const STORE_UPDATED_EVENT = 'iva_store_updated';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(STORE_UPDATED_EVENT));
  } catch {
    // ignore quota errors for demo
  }
}

// ============ JOBS ============
export function useJobs() {
  const [jobs, setJobs] = useState<JobListing[]>(() => loadFromStorage(JOBS_STORAGE_KEY, DEFAULT_JOBS));

  useEffect(() => {
    const handler = () => setJobs(loadFromStorage(JOBS_STORAGE_KEY, DEFAULT_JOBS));
    window.addEventListener(STORE_UPDATED_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(STORE_UPDATED_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const addJob = (job: Omit<JobListing, 'id'>) => {
    const newJob: JobListing = { ...job, id: `job-${Date.now()}` };
    const updated = [newJob, ...jobs];
    saveToStorage(JOBS_STORAGE_KEY, updated);
  };

  const updateJob = (id: string, job: Omit<JobListing, 'id'>) => {
    const updated = jobs.map((j) => (j.id === id ? { ...job, id } : j));
    saveToStorage(JOBS_STORAGE_KEY, updated);
  };

  const deleteJob = (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    saveToStorage(JOBS_STORAGE_KEY, updated);
  };

  const resetJobs = () => {
    saveToStorage(JOBS_STORAGE_KEY, DEFAULT_JOBS);
  };

  return { jobs, addJob, updateJob, deleteJob, resetJobs };
}

// ============ BLOGS ============
export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => loadFromStorage(BLOGS_STORAGE_KEY, DEFAULT_BLOGS));

  useEffect(() => {
    const handler = () => setBlogs(loadFromStorage(BLOGS_STORAGE_KEY, DEFAULT_BLOGS));
    window.addEventListener(STORE_UPDATED_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(STORE_UPDATED_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const addBlog = (blog: Omit<BlogPost, 'id'>) => {
    const newBlog: BlogPost = { ...blog, id: `blog-${Date.now()}` };
    const updated = [newBlog, ...blogs];
    saveToStorage(BLOGS_STORAGE_KEY, updated);
  };

  const updateBlog = (id: string, blog: Omit<BlogPost, 'id'>) => {
    const updated = blogs.map((b) => (b.id === id ? { ...blog, id } : b));
    saveToStorage(BLOGS_STORAGE_KEY, updated);
  };

  const deleteBlog = (id: string) => {
    const updated = blogs.filter((b) => b.id !== id);
    saveToStorage(BLOGS_STORAGE_KEY, updated);
  };

  const resetBlogs = () => {
    saveToStorage(BLOGS_STORAGE_KEY, DEFAULT_BLOGS);
  };

  return { blogs, addBlog, updateBlog, deleteBlog, resetBlogs };
}

// ============ AUTH ============
const AUTH_STORAGE_KEY = 'iva_admin_auth_v1';
const AUTH_UPDATED_EVENT = 'iva_auth_updated';

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'iva@2026',
};

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handler = () => setIsAuthenticated(localStorage.getItem(AUTH_STORAGE_KEY) === 'true');
    window.addEventListener(AUTH_UPDATED_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(AUTH_UPDATED_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username.trim() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        window.dispatchEvent(new CustomEvent(AUTH_UPDATED_EVENT));
      } catch {
        // ignore
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(AUTH_UPDATED_EVENT));
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
