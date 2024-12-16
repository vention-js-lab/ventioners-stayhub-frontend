import { api } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Accommodation } from '#/modules/home/types/accommodation.type';

type GetWishlistedPropertiesResponse = {
  data: Accommodation[];
};

export async function getWishlistedProperties(): Promise<GetWishlistedPropertiesResponse> {
  const response = await api.get<GetWishlistedPropertiesResponse>(ENDPOINTS.wishlist);

  return response.data;
}

export function useWishlistedProperties() {
  return useQuery({
    queryKey: ['wishlisted-properties'],
    queryFn: () => getWishlistedProperties(),
  });
}
