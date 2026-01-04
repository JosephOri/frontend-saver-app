import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, queryKeys, urlSuffixes } from '@/lib';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`${urlSuffixes.CATEGORIES}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CATEGORIES] });
    },
  });
};
