import { useMutation } from '@tanstack/react-query';
import type { AccommodationFormData } from '#/modules/home/types/accommodation-form-data.interface.ts';
import { ENDPOINTS, ROUTES } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { api } from '#/configs';
import { type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useCreateAccommodation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: AccommodationFormData) => {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; ++i) {
            if (value[i] instanceof File) {
              formData.append(`${key}`, value[i] as File);
            } else {
              formData.append(`${key}[]`, value[i] as string);
            }
          }
        } else {
          formData.append(key, value as string);
        }
      }

      return await api.post<Accommodation>(ENDPOINTS.accommodations, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      toast.success('Accommodation created successfully!');
      navigate(ROUTES.root);
    },
    onError: (error: AxiosError) => {
      toast.error(`Error creating accommodation: ${error.message}`);
    },
  });
};
