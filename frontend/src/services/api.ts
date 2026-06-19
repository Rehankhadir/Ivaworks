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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

async function publicRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  const body = (await response.json()) as ApiResponse<T> & { message?: string };

  if (!response.ok) {
    throw new ApiError(body.message ?? 'Request failed', response.status);
  }

  return body.data;
}

export function resolveAssetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${ASSETS_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export { publicRequest };
