import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);
