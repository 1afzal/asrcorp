import axios, { AxiosError } from 'axios';
import { clearToken, getToken } from './auth';

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:4001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Attach the admin Bearer token to every request that has one available.
// Public endpoints simply ignore it.
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 means token is missing/expired — clear it so the admin UI redirects to
// /admin/login on its next render.
api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401 && getToken()) {
      clearToken();
    }
    return Promise.reject(err);
  },
);

export function apiErrorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { error?: string } | undefined;
    if (data?.error) return data.error;
    if (err.message) return err.message;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
