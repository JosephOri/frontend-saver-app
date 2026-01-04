import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, urlSuffixes } from '@/lib';
import type { Category } from '@/typings/category.type';

export const useCategories = () => {
  return useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: async () => {
      const { data } = await apiClient.get<Category[]>(urlSuffixes.CATEGORIES);
      return data;
    },
  });
};
