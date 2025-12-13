import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../common/Loading';

export const HouseholdGuard = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!user || !user.householdId) {
    return <Navigate to="/join-household" replace />;
  }

  return <Outlet />;
};
