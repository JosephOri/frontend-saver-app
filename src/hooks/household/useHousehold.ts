import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import { useNavigate } from 'react-router-dom';

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/household', {});
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate('/')
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
