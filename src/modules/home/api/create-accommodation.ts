import { useMutation } from '@tanstack/react-query';
import type { AccommodationFormData } from '#/modules/home/types/accommodation-form-data.interface.ts';
import { axiosInstance } from '#/configs';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { type AccommodationBasics } from '#/modules/home/types/accommodation-basics.type.ts';
import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';

export const useCreateAccommodation = () => {
  return useMutation({
    mutationFn: (data: AccommodationFormData & AccommodationBasics) =>
      axiosInstance.post<Accommodation>(ENDPOINTS.accommodations, data),
    onSuccess: () => {
      toast.success('Accommodation created successfully!');
      window.location.href = ENDPOINTS.root;
    },
    onError: (error) => {
      toast.error(`Error creating accommodation: ${error}`);
    },
  });
};
