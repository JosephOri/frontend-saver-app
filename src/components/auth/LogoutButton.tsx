import { Button } from '../ui/button';
import { ConfirmModal } from '../common';
import { useLogoutAction } from '@/hooks/auth/useLogoutActions';

export const LogoutButton = () => {
  const { handleLogout, isPending, isOpen, setIsOpen } = useLogoutAction();

  return (
    <>
      <Button variant={'destructive'} onClick={() => setIsOpen(true)}>
        Logout
      </Button>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleLogout}
        loading={isPending}
        title="Are you sure you want to logoout?"
        confirmText="yes"
        variant="default"
      />
    </>
  );
};
