import axios, { AxiosInstance, AxiosError } from 'axios';
import toast from 'react-hot-toast';

// Use relative URL so Vite proxy handles routing to backend
const BASE_URL = '/api/v1';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error('Access denied: insufficient permissions');
      return Promise.reject(error);
    }

    if (status === 409) {
      return Promise.reject(error);
    }

    if (status === 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default api;