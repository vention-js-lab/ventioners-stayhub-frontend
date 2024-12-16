import { api } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Accommodation } from '#/modules/home/types/accommodation.type';

type GetAccommodationByIdResponse = {
  data: Accommodation;
};

export async function getAccommodationById(id: string): Promise<GetAccommodationByIdResponse> {
  const response = await api.get<GetAccommodationByIdResponse>(`${ENDPOINTS.accommodations}/${id}`);
  return response.data;
}

export function useAccommodationById(id: string) {
  return useQuery({
    queryKey: ['accommodation', id],
    queryFn: () => getAccommodationById(id),
    enabled: Boolean(id),
  });
}
