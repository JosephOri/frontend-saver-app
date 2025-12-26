import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import type { Transaction } from '@repo/shared';
import { type CreateTransactionDto } from '@/typings/dto/create-transaction.dto';
import { useCurrentUser } from '../auth';

export const useTransactions = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>('/transactions');
      return data;
    },
    enabled: !!user?.householdId,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createTransactionDTO: CreateTransactionDto) => {
      const { data } = await apiClient.post<Transaction>(
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
