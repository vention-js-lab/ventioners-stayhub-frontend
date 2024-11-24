import { axiosInstance } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { type Accommodation } from '../types/accommodation.type';
import { ENDPOINTS } from '../constants/endpoints.constant';

type GetWishlistedPropertiesResponse = {
  data: Accommodation[];
};

export async function getWishlistedProperties(): Promise<GetWishlistedPropertiesResponse> {
  const response = await axiosInstance.get<GetWishlistedPropertiesResponse>(ENDPOINTS.wishlist);

  return response.data;
}

export function useWishlistedProperties() {
  return useQuery({
    queryKey: ['wishlisted-properties'],
    queryFn: () => getWishlistedProperties(),
  });
}
