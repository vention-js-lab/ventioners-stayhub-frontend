import { api } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../../home/constants/endpoints.constant';
import { type Amenity } from '#/types/amenity.types.ts';

type GetAmenitiesResponse = {
  data: Amenity[];
};

export async function getAmenities(): Promise<GetAmenitiesResponse> {
  const response = await api.get<GetAmenitiesResponse>(ENDPOINTS.amenities);

  return response.data;
}

export function useAmenities() {
  return useQuery({
    queryKey: ['amenities'],
    queryFn: () => getAmenities(),
  });
}
