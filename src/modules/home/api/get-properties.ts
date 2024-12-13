import { api } from '#/configs/axios.config';
import { useInfiniteQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';
import { ENDPOINTS } from '../constants/endpoints.constant';

type GetPropertiesResponse = {
  data: Accommodation[];
  totalCount: number;
  totalPages: number;
};

export type GetPropertiesParams = {
  page?: number;
  categoryId?: string;
  location?: string;
  fromDate?: string;
  toDate?: string;
  numberOfGuests?: string;
  limit?: number;
};

export async function getProperties({
  page = 1,
  limit = 12,
  categoryId,
  location,
  fromDate,
  toDate,
  numberOfGuests,
}: GetPropertiesParams): Promise<GetPropertiesResponse> {
  const params: GetPropertiesParams = {
    page,
    limit,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  if (location) {
    params.location = location;
  }

  if (fromDate) {
    params.fromDate = fromDate;
  }

  if (toDate) {
    params.toDate = toDate;
  }

  if (numberOfGuests) {
    params.numberOfGuests = numberOfGuests;
  }

  const response = await api.get<GetPropertiesResponse>(ENDPOINTS.accommodations, {
    params,
  });

  return response.data;
}

export function useProperties(params: GetPropertiesParams) {
  return useInfiniteQuery({
    queryKey: ['properties', params],
    queryFn: ({ pageParam = 1 }) => {
      return getProperties({ ...params, page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
}
