export const TRANSACTION_TYPES = ['income', 'expense', 'investment'] as const;
export type TransactionsType = (typeof TRANSACTION_TYPES)[number];

export interface Transactions {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: TransactionsType;
  description?: string;
  householdId: string;
}
