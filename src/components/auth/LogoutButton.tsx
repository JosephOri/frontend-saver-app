import { useLogout } from '@/hooks';
import { Button } from '../ui/button';

export const LogoutButton = () => {
  const { mutate: logout } = useLogout();

  return (
    <Button variant={'destructive'} onClick={() => logout()}>
      Logout
    </Button>
  );
};
