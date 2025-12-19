import { useCurrentUser, useTransactions } from '@/hooks';
import {
  FinancialInfo,
  Loading,
  CreateTransactionDialogForm,
} from '@/components';
import { TransactionsTable } from '@/components/household-dashboard/transactions-table/TransactionsTable';

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions();

  if (isUserLoading || isTransactionsLoading) return <Loading />;
  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold">
        Welcome back, {user?.name}
      </h1>
      <CreateTransactionDialogForm />

      {transactions ? (
        <div className="flex flex-col gap-6">
          <FinancialInfo transactions={transactions} />
          <TransactionsTable data={transactions} />
        </div>
      ) : (
        <h1>Create first transaction to see data</h1>
      )}
    </div>
  );
};

export default Dashboard;
