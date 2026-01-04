import type { TransactionType } from '@repo/shared';

export type Category = {
  id: string;
  createdAt: Date;
  value: string;
  type: TransactionType;
  userId: string | null;
};
