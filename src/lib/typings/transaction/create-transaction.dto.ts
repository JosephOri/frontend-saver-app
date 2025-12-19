import type { TransactionsType } from './transaction.types';

export interface CreateTransactionDTO {
  amount: number;
  category: string;
  description?: string;
  type: TransactionsType;
}
