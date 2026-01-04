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
} from '@/components';

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions();
  const { data: recurringTransactions } = useRecurringTransactions();

  if (isUserLoading || isTransactionsLoading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold">
        Welcome back, {user?.name}
      </h1>
      <CreateTransactionDialogForm />

      {transactions ? (
        <div className="flex flex-col gap-6">
          <FinancialInfo
            transactions={transactions}
            recurringTransactions={recurringTransactions || []}
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
