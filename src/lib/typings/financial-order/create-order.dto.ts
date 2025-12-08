import type { FinancialOrderType } from './financial-order.types';

export interface CreateFinancialOrderDTO {
  amount: number;
  category: string;
  description?: string;
  type: FinancialOrderType;
}
