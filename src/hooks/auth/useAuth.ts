import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, queryKeys, urlSuffixes } from '@/lib';
import type { User } from '@repo/shared';
import { useNavigate } from 'react-router-dom';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: [queryKeys.CURRENT_USER],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(urlSuffixes.CURRENT_USER);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await apiClient.post(urlSuffixes.LOGIN, credentials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CURRENT_USER] });
      navigate('/');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post(urlSuffixes.LOGOUT);
    },
    onSuccess: () => {
      queryClient.setQueryData([queryKeys.CURRENT_USER], null);
      navigate('/login');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData: {
      name: string;
      email: string;
      password: string;
    }) => {
      await apiClient.post(urlSuffixes.SIGNUP, userData);
    },
    onSuccess: () => {
      navigate('/login');
    },
  });
};
