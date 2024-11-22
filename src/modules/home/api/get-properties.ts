import { axiosInstance } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';
import { ENDPOINTS } from '../constants/endpoints.constant';

type GetPropertiesResponse = {
  data: Accommodation[];
  totalCount: number;
  totalPages: number;
};
type GetPropertiesParams = {
  page: number;
  categoryId?: string;
  search?: string;
};
export async function getProperties({ page, categoryId, search }: GetPropertiesParams): Promise<GetPropertiesResponse> {
  const params: GetPropertiesParams = {
    page,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  if (search) {
    params.search = search;
  }

  const response = await axiosInstance.get<GetPropertiesResponse>(ENDPOINTS.accommodations, {
    params,
  });

  return response.data;
}

export function useProperties(params: GetPropertiesParams) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => getProperties(params),
  });
}
