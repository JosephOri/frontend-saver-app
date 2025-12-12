import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib';
import type { FinancialOrder, CreateFinancialOrderDTO } from '@/lib/typings';

export const useFinancialOrders = () => {
  return useQuery({
    queryKey: ['financialOrders'],
    queryFn: async () => {
      const { data } = await apiClient.get<FinancialOrder[]>('/financial-order');
      return data;
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createFinancialOrderDTO: CreateFinancialOrderDTO) => {
      const { data } = await apiClient.post<FinancialOrder>('/financial-order', createFinancialOrderDTO);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financialOrders'] });
      queryClient.invalidateQueries({ queryKey: ['household'] });
    },
  });
};
