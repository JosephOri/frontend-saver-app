import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import type { Transactions, CreateTransactionDto } from '@repo/shared';
import { useCurrentUser } from '../auth';

export const useTransactions = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await apiClient.get<Transactions[]>('/transactions');
      return data;
    },
    enabled: !!user?.householdId,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createTransactionDTO: CreateTransactionDto) => {
      const { data } = await apiClient.post<Transactions>(
        '/transactions',
        createTransactionDTO,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['household'] });
    },
  });
};
