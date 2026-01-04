import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import { useCurrentUser } from '../auth';
import { queryKeys, urlSuffixes } from '@/lib/constants';

interface ForecastResponse {
  amount: number;
}

export const useForecast = () => {
  const { data: user } = useCurrentUser();
  return useQuery({
    queryKey: [queryKeys.FORECAST],
    queryFn: async () => {
      const { data } = await apiClient.get<ForecastResponse>(
        urlSuffixes.FORECAST,
      );
      return data;
    },
    enabled: !!user?.householdId,
  });
};
