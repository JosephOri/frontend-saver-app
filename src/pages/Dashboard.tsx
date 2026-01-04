import {
  useCurrentUser,
  useTransactions,
  useRecurringTransactions,
} from '@/hooks';
import {
  FinancialInfo,
  Loading,
  CreateTransactionDialogForm,
  TransactionsTable,
  MonthControl,
} from '@/components';
import { useState } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions(
      startOfMonth(selectedMonth).toISOString(),
      endOfMonth(selectedMonth).toISOString(),
    );
  const { data: recurringTransactions } = useRecurringTransactions();

  if (isUserLoading || isTransactionsLoading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold">
        Welcome back, {user?.name}
      </h1>
      <div className="flex items-center justify-between">
        <CreateTransactionDialogForm />
        <MonthControl
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>

      {transactions ? (
        <div className="flex flex-col gap-6">
          <FinancialInfo
            transactions={transactions}
            recurringTransactions={recurringTransactions || []}
            selectedMonth={selectedMonth}
          />
          <TransactionsTable
            historicalData={transactions}
            recurringRules={recurringTransactions}
          />
        </div>
      ) : (
        <h1>Create first transaction to see data</h1>
      )}
    </div>
  );
};

export default Dashboard;
