import { ENDPOINTS } from '#/modules/owner/constants/endpoints.constant.ts';
import { api } from '#/configs';
import { type Accommodation } from '#/modules/home/types/accommodation.type';
import { useQuery } from '@tanstack/react-query';
import { type Category } from '#/modules/home/types/category.type';

type AccommodationWithCategory = Accommodation & { category: Category };

type GetOwnerPropertiesResponse = {
  data: AccommodationWithCategory[];
};

export async function getOwnerProperties(): Promise<GetOwnerPropertiesResponse> {
  const response = await api.get<GetOwnerPropertiesResponse>(ENDPOINTS.ownerProperties);

  return response.data;
}

export function useOwnerProperties() {
  return useQuery({
    queryKey: ['owner-properties'],
    queryFn: () => getOwnerProperties(),
  });
}
