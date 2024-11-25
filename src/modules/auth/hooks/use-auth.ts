import { axiosInstance } from '#/configs';
import { useAppDispatch } from '#/redux/hooks';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants';
import { AxiosAuthResponse } from '../types';
import { createUser } from '#/redux/auth/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();

  function getUser() {
    axiosInstance
      .get(ENDPOINTS.user)
      .then((res) => {
        const resData = res.data as AxiosAuthResponse;
        dispatch(createUser(resData.user));

        return resData.user;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  return useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
    staleTime: 10 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
