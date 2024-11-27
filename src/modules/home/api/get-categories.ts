import { api } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Category } from '../types/category.type';

type GetCategoriesResponse = {
  data: Category[];
};

export async function getCategories(): Promise<GetCategoriesResponse> {
  const response = await api.get<GetCategoriesResponse>(ENDPOINTS.categories);

  return response.data;
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
}
