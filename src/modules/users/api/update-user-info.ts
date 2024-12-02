import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '#/configs';
import { type AxiosErrorResponse, type ProfileFormData } from '../types';
import { type AxiosAuthResponse } from '#/modules/auth/types';
import { ENDPOINTS } from '../constants';
import { useAppDispatch } from '#/redux/hooks';
import { createUser } from '#/redux/auth/auth-slice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { type AxiosError } from 'axios';
import { type UseFormSetError } from 'react-hook-form';
import { type User } from '#/types';

export function useUpdateUserInfo(userId: string | undefined, setError: UseFormSetError<ProfileFormData>) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<User, AxiosError<AxiosErrorResponse>, ProfileFormData>({
    mutationFn: async (data) => {
      if (!userId) throw new Error('User id is required to update user information');

      const response = await api.put<AxiosAuthResponse>(`${ENDPOINTS.users}/${userId}`, data);
      return response.data.data;
    },
    onSuccess(user) {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      dispatch(createUser(user));
      toast('Success');

      navigate(-1);
    },
    onError(err) {
      if (err.response?.data) {
        const errorData = err.response.data;
        setError('firstName', { message: errorData.message });
      } else {
        setError('firstName', { message: 'Something went wrong' });
      }
    },
  });
}
