import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '#/configs';
import { type AxiosErrorResponse, type ProfileFormData } from '../types';
import { ROUTES } from '../constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { type AxiosError } from 'axios';
import { type UseFormSetError } from 'react-hook-form';
import { ENDPOINTS as AUTH_ENDPOINTS } from '#/modules/auth/constants';

export function useUpdateUserPassword(setError: UseFormSetError<ProfileFormData>) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<unknown, AxiosError<AxiosErrorResponse>, ProfileFormData>({
    mutationFn: async (data) => {
      await api.post(`${AUTH_ENDPOINTS.updatePassword}`, {
        oldPassword: data.oldPassword,
        newPassword: data.password,
      });
    },
    onSuccess() {
      toast('Success');
      navigate(ROUTES.root);
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
