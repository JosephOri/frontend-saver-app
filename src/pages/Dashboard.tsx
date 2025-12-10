import { useCurrentUser, useFinancialOrders } from '@/hooks';
import { CreateFinancialOrderDialogForm, FinancialInfo, LogoutButton } from '@/components';

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: orders, isLoading: isOrdersLoading } = useFinancialOrders();

  if (isUserLoading || isOrdersLoading) return <div>Loading...</div>;
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col justify-between items-center gap-5">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <LogoutButton />

        <CreateFinancialOrderDialogForm />

        <FinancialInfo orders={orders || []} />
      </div>
    </div>
  );
};

export default Dashboard;
