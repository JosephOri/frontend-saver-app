import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, queryKeys, urlSuffixes } from '@/lib';
import { type AddUserToHouseholdDto } from '@/typings';
import { useNavigate } from 'react-router-dom';

export const useCreateHousehold = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post(urlSuffixes.HOUSEHOLD, {});
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CURRENT_USER] });
      navigate('/');
    },
  });
};

export const useAddMemberToHousehold = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ targetUserName, adminId }: AddUserToHouseholdDto) => {
      await apiClient.post(urlSuffixes.ADD_USER_TO_HOUSEHOLD, {
        targetUserName,
        adminId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CURRENT_USER] });
      navigate('/');
    },
  });
};
