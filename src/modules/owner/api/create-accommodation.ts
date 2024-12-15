import { useMutation } from '@tanstack/react-query';
import type { AccommodationFormData } from '#/zod';
import { toast } from 'react-toastify';
import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { api } from '#/configs';
import { type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS, ROUTES } from '../constants/endpoints.constant';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';

export const useCreateAccommodation = () => {
  const { t } = useTranslation('create-accommodation');
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
        } else if (key === 'locationCoordinates') {
          const location = value as unknown as { type: string; coordinates: [number, number] };
          formData.append(`${key}[type]`, location.type);
          formData.append(`${key}[coordinates][0]`, location.coordinates[0].toString());
          formData.append(`${key}[coordinates][1]`, location.coordinates[1].toString());
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
      toast.success(t(TRANSLATION_KEYS.create_accommodation.accommodation_created_success));
      navigate(ROUTES.root);
    },
    onError: (error: AxiosError) => {
      toast.error(`Error creating accommodation: ${error.message}`);
    },
  });
};
