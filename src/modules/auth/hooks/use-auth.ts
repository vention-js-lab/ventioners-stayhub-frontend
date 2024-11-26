import { axiosInstance } from '#/configs';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants';

export function useAuth() {
  async function getUser() {
    try {
      const { data } = await axiosInstance.get(ENDPOINTS.user);
      return data.user;
    } catch (err) {
      console.error(err);
      throw new Error('Could not fetch user');
    }
  }

  return useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
    staleTime: 10 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
