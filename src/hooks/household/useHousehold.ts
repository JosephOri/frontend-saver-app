import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../lib/axios';

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/household', {});
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useAddMemberToHousehold = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await apiClient.post('/users/add-to-household', { email });
    },
  });
};
