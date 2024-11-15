import { axiosInstance } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';
import { ENDPOINTS } from '../constants/endpoints.constant';

type GetPropertiesResponse = {
  data: Accommodation[];
  totalCount: number;
  totalPages: number;
};

export async function getProperties(page: number = 1, categoryId?: string): Promise<GetPropertiesResponse> {
  const params: { page: number; categoryId?: string } = {
    page,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  const response = await axiosInstance.get<GetPropertiesResponse>(ENDPOINTS.accommodations, {
    params,
  });

  return response.data;
}

export function useProperties({ page = 1, categoryId }: { page?: number; categoryId?: string }) {
  return useQuery({
    queryKey: ['properties', { page, categoryId }],
    queryFn: () => getProperties(page, categoryId),
  });
}
