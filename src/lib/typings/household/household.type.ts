import type { User } from '../auth';
import type { FinancialOrder } from '../financial-order';

export interface Household {
  id: string;
  adminId: string;
  participants: User[];
  financialOrders: FinancialOrder[];
}
