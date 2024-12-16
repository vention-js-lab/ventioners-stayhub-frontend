import { type QueryClient, useMutation, type UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { api } from '#/configs';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { type AxiosResponse, type AxiosError } from 'axios';

interface ReviewFormData {
  rating: number;
  comment: string;
  accommodationId: string;
}

export const useCreateReview = (
  queryClient: QueryClient,
  accommodationId: string
): UseMutationResult<AxiosResponse, AxiosError, ReviewFormData> => {
  return useMutation({
    mutationFn: async (data: ReviewFormData) => {
      return await api.post(ENDPOINTS.reviews, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodation', accommodationId] });
      toast.success('Review submitted successfully!');
    },
    onError: (error: AxiosError) => {
      toast.error(`Error submitting review: ${error.message}`);
    },
  });
};