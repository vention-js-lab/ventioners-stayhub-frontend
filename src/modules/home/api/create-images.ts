import { axiosInstance } from '#/configs';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type UploadAccommodationImagesResponse = {
  data: string[];
};
const uploadAccommodationImages = async (files: File[], accommodationId: string) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('images', file);
  });

  formData.append('accommodationId', accommodationId);

  const response = await axiosInstance.post<UploadAccommodationImagesResponse>(
    `${ENDPOINTS.accommodations}/${accommodationId}/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const useUploadAccommodationImages = () => {
  return useMutation({
    mutationFn: ({ files, accommodationId }: { files: File[]; accommodationId: string }) =>
      uploadAccommodationImages(files, accommodationId),
    onSuccess: () => {
      toast.success('Images uploaded successfully!');
      window.location.reload();
    },
    onError: (error) => {
      toast.error(`Error uploading images: ${error}`);
    },
  });
};
