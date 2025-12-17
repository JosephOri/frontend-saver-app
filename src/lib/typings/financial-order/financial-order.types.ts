export const FINANCIAL_ORDER_TYPES = [
  'income',
  'expense',
  'investment',
] as const;
export type FinancialOrderType = (typeof FINANCIAL_ORDER_TYPES)[number];

export interface FinancialOrder {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: FinancialOrderType;
  description?: string;
  householdId: string;
}
