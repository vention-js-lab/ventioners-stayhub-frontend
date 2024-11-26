import { useMutation } from '@tanstack/react-query';
import type { AccommodationFormData } from '#/modules/home/types/accommodation-form-data.interface.ts';
import { axiosInstance } from '#/configs';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';

export const useCreateAccommodation = () => {
  return useMutation({
    mutationFn: (data: AccommodationFormData) =>
      axiosInstance.post(ENDPOINTS.accommodations, data, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      toast.success('Accommodation created successfully!');
      window.location.href = ENDPOINTS.root;
    },
    onError: (error) => {
      toast.error(`Error creating accommodation: ${error}`);
    },
  });
};
