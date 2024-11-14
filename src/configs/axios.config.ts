import { ENDPOINTS } from '#/modules/auth/constants';
import { AccessTokenStore } from '#/utils';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AccessTokenStore.getToken()}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response?.status === 401 && error.message !== 'Invalid refresh token') {
      try {
        const response = await axiosInstance.get(ENDPOINTS.refresh);
        AccessTokenStore.setToken(response.data.acessToken);

        return axiosInstance(error.config);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
