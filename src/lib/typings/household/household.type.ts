import type { User } from '../auth';
import type { Transactions } from '../transaction';

export interface Household {
  id: string;
  adminId: string;
  participants: User[];
  transactions: Transactions[];
}
