import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_BACKEND_URL, VITE_BACKEND_BASE_API } = getEnvVariables();

const baseURL = `${VITE_BACKEND_URL}/${VITE_BACKEND_BASE_API}`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; 
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
