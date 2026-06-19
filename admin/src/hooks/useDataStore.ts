import { useCallback, useEffect, useState } from 'react';
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  publishJob,
  unpublishJob,
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
  fetchDashboardStats,
  loginRequest,
  type DashboardStats,
} from '../services/content.api';
import type { JobListing, BlogPost, AdminUser } from '../types';

const AUTH_TOKEN_KEY = 'iva_admin_token';
const AUTH_USER_KEY = 'iva_admin_user';
const AUTH_UPDATED_EVENT = 'iva_auth_updated';

function readStoredUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState<AdminUser | null>(readStoredUser);

  useEffect(() => {
    const handler = () => {
      setIsAuthenticated(Boolean(localStorage.getItem(AUTH_TOKEN_KEY)));
      setUser(readStoredUser());
    };
    window.addEventListener(AUTH_UPDATED_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(AUTH_UPDATED_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await loginRequest(username, password);
      localStorage.setItem(AUTH_TOKEN_KEY, result.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.admin));
      window.dispatchEvent(new CustomEvent(AUTH_UPDATED_EVENT));
      setIsAuthenticated(true);
      setUser(result.admin);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_UPDATED_EVENT));
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout };
}

export function useJobs() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addJob = async (job: Omit<JobListing, 'id'>) => {
    const created = await createJob(job);
    setJobs((prev) => [created, ...prev]);
    return created;
  };

  const updateJobById = async (id: string, job: Omit<JobListing, 'id'>) => {
    const updated = await updateJob(id, job, job.status);
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
    return updated;
  };

  const deleteJobById = async (id: string) => {
    await deleteJob(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const publishJobById = async (id: string) => {
    const updated = await publishJob(id);
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
    return updated;
  };

  const unpublishJobById = async (id: string) => {
    const updated = await unpublishJob(id);
    setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
    return updated;
  };

  return {
    jobs,
    loading,
    error,
    refetch,
    addJob,
    updateJob: updateJobById,
    deleteJob: deleteJobById,
    publishJob: publishJobById,
    unpublishJob: unpublishJobById,
  };
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addBlog = async (blog: Omit<BlogPost, 'id'>) => {
    const created = await createBlog(blog);
    setBlogs((prev) => [created, ...prev]);
    return created;
  };

  const updateBlogById = async (id: string, blog: Omit<BlogPost, 'id'>) => {
    const updated = await updateBlog(id, blog, blog.status);
    setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  const deleteBlogById = async (id: string) => {
    await deleteBlog(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const publishBlogById = async (id: string) => {
    const updated = await publishBlog(id);
    setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  const unpublishBlogById = async (id: string) => {
    const updated = await unpublishBlog(id);
    setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  return {
    blogs,
    loading,
    error,
    refetch,
    addBlog,
    updateBlog: updateBlogById,
    deleteBlog: deleteBlogById,
    publishBlog: publishBlogById,
    unpublishBlog: unpublishBlogById,
  };
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { stats, loading, error, refetch };
}
