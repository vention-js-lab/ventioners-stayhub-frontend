/* eslint-disable */
import { ENDPOINTS } from '#/modules/auth/constants';
import axios from 'axios';
import i18n from '#/libs/i18n.lib';

const URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': localStorage.getItem('i18nextLng') || i18n.language || 'en',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    let retryCnt = Number(originalRequest.headers['X-Refresh-Token-Retry-Count']);
    if (Number.isNaN(retryCnt)) {
      originalRequest.headers['X-Refresh-Token-Retry-Count'] = 0;
      retryCnt = 0;
    }

    if (error.response && error.response?.status === 401 && retryCnt === 0) {
      try {
        await api.get(ENDPOINTS.refresh, {
          headers: { 'X-Refresh-Token-Retry-Count': retryCnt + 1 },
        });

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
