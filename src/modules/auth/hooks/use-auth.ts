import { api } from '#/configs';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants';
import { type AxiosAuthResponse } from '../types';

export function useAuth() {
  async function getUser() {
    try {
      const { data } = await api.get<AxiosAuthResponse>(ENDPOINTS.user);

      if (!Object.keys(data).includes('user')) {
        throw new Error('Could not fetch user');
      }

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
