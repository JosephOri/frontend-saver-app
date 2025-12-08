import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
