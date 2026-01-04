import type {
  Transaction,
  RecurringTransaction,
  RecurrenceInterval,
} from '@repo/shared';
import { StatCard } from './StatCard';
import { useMemo } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Calculator } from 'lucide-react';
import { ExpensePieChart } from './ExpensePieChart';
import {
  endOfMonth,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
  isBefore,
  isSameMonth,
} from 'date-fns';

interface Props {
  transactions: Transaction[];
  recurringTransactions: RecurringTransaction[];
}

const calculateNextDate = (
  currentDate: Date,
  interval: RecurrenceInterval,
): Date => {
  switch (interval) {
    case 'daily':
      return addDays(currentDate, 1);
    case 'weekly':
      return addWeeks(currentDate, 1);
    case 'monthly':
      return addMonths(currentDate, 1);
    case 'yearly':
      return addYears(currentDate, 1);
    default:
      return addMonths(currentDate, 1);
  }
};

export const FinancialInfo = ({
  transactions,
  recurringTransactions,
}: Props) => {
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
  }, [expenses]);

  const activeRecurringTransactions = useMemo(() => {
    return recurringTransactions || [];
  }, [recurringTransactions]);

  const forecastedBalance = useMemo(() => {
    const now = new Date();
    const endOfCurrentMonth = endOfMonth(now);

    // 1. Realized Amounts (Transactions in current month)
    const realizedExpenses = expenses
      .filter((t) => isSameMonth(new Date(t.date), now))
      .reduce((sum, t) => sum + t.amount, 0);

    const realizedIncome = incomes
      .filter((t) => isSameMonth(new Date(t.date), now))
      .reduce((sum, t) => sum + t.amount, 0);

    // 2. Projected Recurring Amounts
    let projectedExpenses = 0;
    let projectedIncome = 0;

    activeRecurringTransactions.forEach((recurring) => {
      let nextRun = new Date(recurring.nextRunDate);

      while (
        isBefore(nextRun, endOfCurrentMonth) ||
        nextRun.getTime() === endOfCurrentMonth.getTime()
      ) {
        if (
          recurring.endDate &&
          isAfter(nextRun, new Date(recurring.endDate))
        ) {
          break;
        }

        if (recurring.type === 'expense') {
          projectedExpenses += recurring.amount;
        } else if (recurring.type === 'income') {
          projectedIncome += recurring.amount;
        }

        nextRun = calculateNextDate(nextRun, recurring.interval);
      }
    });

    const totalProjectedIncome = realizedIncome + projectedIncome;
    const totalProjectedExpenses = realizedExpenses + projectedExpenses;

    return totalProjectedIncome - totalProjectedExpenses;
  }, [expenses, incomes, activeRecurringTransactions]);
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full md:w-1/2">
        <ExpensePieChart expenses={expenses} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
        <StatCard
          title="Forecasted Balance"
          value={forecastedBalance}
          icon={Calculator}
        />
      </div>
    </div>
  );
};
