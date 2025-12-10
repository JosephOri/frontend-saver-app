import { useLogout } from '@/hooks';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ConfirmModal } from '../common';

export const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Button variant={'destructive'} onClick={() => setOpen(true)}>
        Logout
      </Button>

      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        loading={isPending}
        title="Are you sure you want to logoout?"
        confirmText="yes"
        variant="default"
      />
    </>
  );
};
