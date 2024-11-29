import { api } from '#/configs';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants';
import { type AxiosAuthResponse } from '../types';

export function useAuth() {
  async function getUser() {
    const { data } = await api.get<AxiosAuthResponse>(ENDPOINTS.user);

    return data.user;
  }

  return useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
    staleTime: 10 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
