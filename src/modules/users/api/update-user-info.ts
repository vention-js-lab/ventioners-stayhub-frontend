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

export function useUpdateUser(userId: string | undefined, setError: UseFormSetError<ProfileFormData>) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<AxiosAuthResponse, AxiosError<AxiosErrorResponse>, ProfileFormData>({
    mutationFn: async (data) => {
      if (!userId) throw new Error('User id is required to update user information');

      const response = await api.put<AxiosAuthResponse>(`${ENDPOINTS.users}/${userId}`, data);
      return response.data;
    },
    onSuccess(data) {
      dispatch(createUser(data.user));
      toast('Success');
      navigate(-1);

      return queryClient.invalidateQueries({ queryKey: ['auth-user'] });
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
