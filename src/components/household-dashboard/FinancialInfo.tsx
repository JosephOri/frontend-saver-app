import type { Transactions } from '@repo/shared';
import { StatCard } from './StatCard';
import { useMemo } from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { ExpensePieChart } from './ExpensePieChart';

interface Props {
  transactions: Transactions[];
}

export const FinancialInfo = ({ transactions }: Props) => {
  const incomes = useMemo(() => {
    return transactions?.filter((o) => o.type === 'income');
  }, [transactions]);

  const totalIncomeAmount = useMemo(() => {
    return incomes.reduce((sum, o) => sum + o.amount, 0) || 0;
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions?.filter((o) => o.type === 'expense');
  }, [transactions]);

  const totalExpenseAmount = useMemo(() => {
    return expenses.reduce((sum, o) => sum + o.amount, 0) || 0;
  }, [transactions]);
  return (
    <div className="grid grid-cols-3 gap-4">
      <ExpensePieChart
        className="col-span-3 md:col-span-1 md:row-span-2"
        expenses={expenses}
      />

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
