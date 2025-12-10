import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../ui/spinner';

export const GuestGuard = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
