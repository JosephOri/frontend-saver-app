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
  selectedMonth: Date;
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
  selectedMonth,
}: Props) => {
  const incomes = useMemo(() => {
    return transactions?.filter((o) => o.type === 'income');
  }, [transactions]);

  const totalIncomeAmount = useMemo(() => {
    return incomes.reduce((sum, o) => sum + o.amount, 0) || 0;
  }, [incomes]);

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
    const isCurrentMonth = isSameMonth(selectedMonth, now);
    const endOfViewMonth = endOfMonth(selectedMonth);

    // 1. Realized Amounts (Transactions in selected month)
    // using transactions passed as prop which should already be filtered for this month
    const realizedExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const realizedIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

    // 2. Projected Recurring Amounts
    let projectedExpenses = 0;
    let projectedIncome = 0;

    // Only project if we are viewing current or future months
    if (!isBefore(endOfViewMonth, now)) {
      activeRecurringTransactions.forEach((recurring) => {
        let nextRun = new Date(recurring.nextRunDate);

        // Advance to start of selected month if needed
        while (isBefore(nextRun, selectedMonth)) {
          nextRun = calculateNextDate(nextRun, recurring.interval);
        }

        while (
          isBefore(nextRun, endOfViewMonth) ||
          nextRun.getTime() === endOfViewMonth.getTime()
        ) {
          if (
            recurring.endDate &&
            isAfter(nextRun, new Date(recurring.endDate))
          ) {
            break;
          }

          // If current month, only include if distinctively in future relative to now
          // If future month, include everything
          const shouldInclude = !isCurrentMonth || isAfter(nextRun, now);

          if (shouldInclude) {
            if (recurring.type === 'expense') {
              projectedExpenses += recurring.amount;
            } else if (recurring.type === 'income') {
              projectedIncome += recurring.amount;
            }
          }

          nextRun = calculateNextDate(nextRun, recurring.interval);
        }
      });
    }

    const totalProjectedIncome = realizedIncome + projectedIncome;
    const totalProjectedExpenses = realizedExpenses + projectedExpenses;

    return totalProjectedIncome - totalProjectedExpenses;
  }, [expenses, incomes, activeRecurringTransactions, selectedMonth]);
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
