/* eslint-disable */
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origReq = error.config;

    let retryCnt = Number(origReq.headers['X-Refresh-Token-Retry-Count']);
    if (Number.isNaN(retryCnt)) {
      origReq.headers['X-Refresh-Token-Retry-Count'] = 0;
      retryCnt = 0;
    }

    if (error.response && error.response?.status === 401 && retryCnt === 0) {
      try {
        await axiosInstance.get(ENDPOINTS.refresh, {
          headers: { 'X-Refresh-Token-Retry-Count': retryCnt + 1 },
        });

        return axiosInstance(origReq);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
