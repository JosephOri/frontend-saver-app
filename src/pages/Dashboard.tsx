import { useCurrentUser, useFinancialOrders } from '@/hooks';
import {
  CreateFinancialOrderDialogForm,
  FinancialInfo,
  LogoutButton,
  AddMemberDialog,
} from '@/components';
import Loading from '@/components/common/Loading';

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { data: orders, isLoading: isOrdersLoading } = useFinancialOrders();

  if (isUserLoading || isOrdersLoading) return <Loading />;
  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col items-center justify-between gap-5">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
        <LogoutButton />

        <CreateFinancialOrderDialogForm />

        <FinancialInfo orders={orders || []} />

        <AddMemberDialog />
      </div>
    </div>
  );
};

export default Dashboard;
