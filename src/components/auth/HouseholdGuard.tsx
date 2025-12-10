import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../ui/spinner';

export const HouseholdGuard = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user || !user.householdId) {
    return <Navigate to="/join-household" replace />;
  }

  return <Outlet />;
};
