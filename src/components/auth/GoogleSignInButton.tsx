import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

interface Props {
  className?: string;
}

const GoogleLoginButton = ({ className = '' }: Props) => {
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${apiUrl}/auth/google-auth`;
  };

  return (
    <Button type="button" variant="outline" className={`w-full gap-2 ${className}`} onClick={handleGoogleLogin}>
      <FcGoogle className="h-5 w-5" />
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
