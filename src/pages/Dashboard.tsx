import { useCurrentUser, useFinancialOrders } from '@/hooks';
import {
  FinancialInfo,
  LogoutButton,
  AddMemberDialog,
  Loading,
} from '@/components';

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: orders, isLoading: isOrdersLoading } = useFinancialOrders();

  if (isUserLoading || isOrdersLoading) return <Loading />;
  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold">
        Welcome back, {user?.name}
      </h1>
      <LogoutButton />

      <AddMemberDialog />

      <FinancialInfo orders={orders || []} />
    </div>
  );
};

export default Dashboard;
