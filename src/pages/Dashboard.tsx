import { useCurrentUser, useFinancialOrders } from '@/hooks';
import {
  FinancialInfo,
  Loading,
  CreateFinancialOrderDialogForm,
} from '@/components';
import { OrdersTable } from '@/components/household-dashboard/orders-table/OrdersTable';

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: orders, isLoading: isOrdersLoading } = useFinancialOrders();

  if (isUserLoading || isOrdersLoading) return <Loading />;
  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold">
        Welcome back, {user?.name}
      </h1>
      <CreateFinancialOrderDialogForm />

      {orders ? (
        <div className="flex flex-col gap-6">
          <FinancialInfo orders={orders} />
          <OrdersTable data={orders} />
        </div>
      ) : (
        <h1>Create first transaction to see data</h1>
      )}
    </div>
  );
};

export default Dashboard;
