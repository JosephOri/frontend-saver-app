import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, queryKeys, urlSuffixes } from '@/lib';
import type { Category } from '@/typings/category.type';
import { useCurrentUser } from '../auth';

type CreateCategoryData = Pick<Category, 'value' | 'type'>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();

  return useMutation({
    mutationFn: async (data: CreateCategoryData) => {
      const { data: newCategory } = await apiClient.post<Category>(
        urlSuffixes.CATEGORIES,
        { ...data, userId: user?.id },
      );
      return newCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CATEGORIES] });
    },
  });
};
