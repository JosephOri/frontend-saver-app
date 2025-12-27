import { type TransactionType } from '@repo/shared';

export type CreateTransactionDto = {
  amount: number;
  category: string;
  date?: Date;
  description?: string;
  type: TransactionType;
  recurrenceInterval?: string;
  recurrenceEndDate?: Date;
};
