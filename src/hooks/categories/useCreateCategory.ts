import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, queryKeys, urlSuffixes } from '@/lib';
import type { Category } from '@/typings/category.type';

type CreateCategoryData = Pick<Category, 'value' | 'type'>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const { data: newCategory } = await apiClient.post<Category>(
        urlSuffixes.CATEGORIES,
        data,
      );
      return newCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CATEGORIES] });
    },
  });
};
