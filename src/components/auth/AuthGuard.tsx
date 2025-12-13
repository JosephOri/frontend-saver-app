import { useCurrentUser } from '@/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '@/Layout';
import Loading from '../common/Loading';

export const AuthGuard = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <Loading />;
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
