import type { Transactions } from '@/lib/typings';
import { StatCard } from './StatCard';
import { useMemo } from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

interface Props {
  transactions: Transactions[];
}

export const FinancialInfo = ({ transactions }: Props) => {
  const totalIncomeAmount = useMemo(() => {
    return (
      transactions
        ?.filter((o) => o.type === 'income')
        .reduce((sum, o) => sum + o.amount, 0) || 0
    );
  }, [transactions]);

  const totalExpenseAmount = useMemo(() => {
    return (
      transactions
        ?.filter((o) => o.type === 'expense')
        .reduce((sum, o) => sum + o.amount, 0) || 0
    );
  }, [transactions]);
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
