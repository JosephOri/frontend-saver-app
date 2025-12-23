import { Routes, Route } from 'react-router-dom';
import { AuthGuard, GuestGuard, HouseholdGuard } from '@/components';
import { Toaster } from 'sonner';
import { routes } from './lib';

function App() {
  const { protectedRoutes, unprotectedRoutes } = routes;
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<GuestGuard />}>
          {unprotectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route element={<AuthGuard />}>
          {protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route element={<HouseholdGuard />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
