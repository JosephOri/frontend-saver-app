import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import type { Transactions, CreateTransactionDTO } from '@/lib/typings';

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await apiClient.get<Transactions[]>('/transactions');
      return data;
    },
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createTransactionDTO: CreateTransactionDTO) => {
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
