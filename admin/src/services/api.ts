const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
export const ASSETS_URL = import.meta.env.VITE_ASSETS_URL ?? 'http://localhost:5000';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('iva_admin_token');

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const body = (await response.json()) as ApiResponse<T> & { message?: string };

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('iva_admin_token');
      localStorage.removeItem('iva_admin_user');
      window.dispatchEvent(new CustomEvent('iva_auth_updated'));
    }
    throw new ApiError(body.message ?? 'Request failed', response.status);
  }

  return body;
}

export function resolveAssetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${ASSETS_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
