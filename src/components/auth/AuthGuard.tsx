import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../ui/spinner';
import Layout from '@/Layout';

export const AuthGuard = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
