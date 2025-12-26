import {
  type ExpenseCategory,
  type IncomeCategory,
  type TransactionType,
} from '@repo/shared';

export type CreateTransactionDto = {
  amount: number;

  category: IncomeCategory | ExpenseCategory;

  date?: string;

  description?: string;

  type: TransactionType;
};
