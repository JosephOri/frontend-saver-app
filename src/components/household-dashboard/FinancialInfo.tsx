import type { FinancialOrder } from '@/lib/typings';
import { StatCard } from './StatCard';
import { useMemo } from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { OrdersTable } from './orders-table/OrdersTable';

interface Props {
  orders: FinancialOrder[];
}

export const FinancialInfo = ({ orders }: Props) => {
  const totalIncomeAmount = useMemo(() => {
    return (
      orders
        ?.filter((o) => o.type === 'income')
        .reduce((sum, o) => sum + o.amount, 0) || 0
    );
  }, [orders]);

  const totalExpenseAmount = useMemo(() => {
    return (
      orders
        ?.filter((o) => o.type === 'expense')
        .reduce((sum, o) => sum + o.amount, 0) || 0
    );
  }, [orders]);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Income"
        value={totalIncomeAmount}
        icon={TrendingUp}
      />
      <StatCard
        title="Total Expenses"
        value={totalExpenseAmount}
        icon={TrendingDown}
      />
      <StatCard
        title="Balance"
        value={totalIncomeAmount - totalExpenseAmount}
        icon={DollarSign}
      />
    </div>
  );
};
