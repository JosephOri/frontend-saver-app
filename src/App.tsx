import { Routes, Route } from 'react-router-dom';
import { AuthGuard, GuestGuard } from '@/components';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
