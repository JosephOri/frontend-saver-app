import { useState } from 'react';
import { useLogout } from './useAuth';

export const useLogoutAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return { handleLogout, isOpen, setIsOpen, isPending };
};
