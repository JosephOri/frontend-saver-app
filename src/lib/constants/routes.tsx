import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Inbox from '@/pages/Inbox';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { HomeIcon, InboxIcon } from 'lucide-react';
import { FaDashcube } from 'react-icons/fa';

export const routes = {
  unprotectedRoutes: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ],
  protectedRoutes: [
    {
      path: '/',
      element: <Home />,
      icon: HomeIcon,
      label: 'Home',
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      icon: FaDashcube,
      label: 'Dashboard',
    },
    {
      path: '/inbox',
      element: <Inbox />,
      icon: InboxIcon,
      label: 'Inbox',
    },
  ],
};
