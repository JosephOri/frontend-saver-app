import { useCurrentUser } from '../auth';
import { apiClient } from '@/lib';
import type { Transaction } from '@repo/shared';
import { useQuery } from '@tanstack/react-query';

export const useTransactionGroupedByDate = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>('/transactions/date');
      return data;
    },
    enabled: !!user?.householdId,
  });
};
