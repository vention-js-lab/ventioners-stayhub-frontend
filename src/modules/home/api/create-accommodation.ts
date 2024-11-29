import { useMutation } from '@tanstack/react-query';
import type { AccommodationFormData } from '#/modules/home/types/accommodation-form-data.interface.ts';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { type AxiosError } from 'axios';
import { api } from '#/configs';

export const useCreateAccommodation = () => {
  return useMutation({
    mutationFn: (data: AccommodationFormData) => api.post<Accommodation>(ENDPOINTS.accommodations, data),
    onSuccess: () => {
      toast.success('Accommodation created successfully!');
      window.location.href = ENDPOINTS.root;
    },
    onError: (error: AxiosError) => {
      toast.error(`Error creating accommodation: ${error.message}`);
    },
  });
};
