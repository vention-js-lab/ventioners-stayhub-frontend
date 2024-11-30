import { useMutation } from '@tanstack/react-query';
import type { AccommodationFormData } from '#/modules/home/types/accommodation-form-data.interface.ts';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { api } from '#/configs';
import { type AxiosError } from 'axios';

export const useCreateAccommodation = () => {
  api.defaults.headers['Content-Type'] = 'multipart/form-data';
  return useMutation({
    mutationFn: async (data: AccommodationFormData) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}`, item);
            } else {
              formData.append(`${key}[${index}]`, item as string);
            }
          });
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      return await api.post<Accommodation>(ENDPOINTS.accommodations, formData);
    },
    onSuccess: () => {
      toast.success('Accommodation created successfully!');
      window.location.href = ENDPOINTS.root;
    },
    onError: (error: AxiosError) => {
      toast.error(`Error creating accommodation: ${error.message}`);
    },
  });
};
