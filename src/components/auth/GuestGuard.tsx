import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../common/Loading';

export const GuestGuard = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
