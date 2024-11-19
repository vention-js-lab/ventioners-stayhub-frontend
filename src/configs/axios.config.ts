import { ENDPOINTS } from '#/modules/auth/constants';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
