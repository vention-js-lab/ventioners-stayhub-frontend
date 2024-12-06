import { api } from '#/configs/axios.config';
import { useInfiniteQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';
import { ENDPOINTS } from '../constants/endpoints.constant';

type GetPropertiesResponse = {
  data: Accommodation[];
  totalCount: number;
  totalPages: number;
};

type GetPropertiesParams = {
  page?: number;
  categoryId?: string;
  search?: string;
  limit?: number;
};

export async function getProperties({
  page = 1,
  limit = 12,
  categoryId,
  search,
}: GetPropertiesParams): Promise<GetPropertiesResponse> {
  const params: GetPropertiesParams = {
    page,
    limit,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  if (search) {
    params.search = search;
  }

  const response = await api.get<GetPropertiesResponse>(ENDPOINTS.accommodations, {
    params,
  });

  return response.data;
}

export function useProperties(params: GetPropertiesParams) {
  return useInfiniteQuery({
    queryKey: ['properties', params],
    queryFn: ({ pageParam = 1 }) => getProperties({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
}
