import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import type { Transaction, RecurringTransaction } from '@repo/shared';
import { type CreateTransactionDto } from '@/typings/dto/create-transaction.dto';
import { useCurrentUser } from '../auth';
import { queryKeys, urlSuffixes } from '@/lib/constants';

export const useTransactions = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: [queryKeys.TRANSACTIONS],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>(
        urlSuffixes.TRANSACTIONS,
      );
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
        urlSuffixes.TRANSACTIONS,
        createTransactionDTO,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TRANSACTIONS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.HOUSEHOLD] });
    },
  });
};

export const useRecurringTransactions = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: [queryKeys.RECURRING_TRANSACTIONS],
    queryFn: async () => {
      const { data } = await apiClient.get<RecurringTransaction[]>(
        urlSuffixes.RECURRING_TRANSACTIONS,
      );
      return data;
    },
    enabled: !!user?.householdId,
  });
};
