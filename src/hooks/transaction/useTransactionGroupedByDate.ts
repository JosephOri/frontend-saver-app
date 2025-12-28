import { useCurrentUser } from '../auth';
import { apiClient, queryKeys } from '@/lib';
import type { Transaction } from '@repo/shared';
import { useQuery } from '@tanstack/react-query';

export const useTransactionGroupedByDate = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: [queryKeys.DATE_TRANSACTION],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>('/transactions/date');
      return data;
    },
    enabled: !!user?.householdId,
  });
};
