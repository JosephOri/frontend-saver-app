import { Routes, Route } from 'react-router-dom';
import { AuthGuard, GuestGuard, HouseholdGuard } from '@/components';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'sonner';
import JoinHouseholdPage from './pages/JoinHouseholdPage';
import Inbox from './pages/Inbox';

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
          <Route path="/join-household" element={<JoinHouseholdPage />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route element={<HouseholdGuard />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
