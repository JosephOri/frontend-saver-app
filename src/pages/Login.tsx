import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaEye } from 'react-icons/fa';
import { LuEyeClosed } from 'react-icons/lu';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLoginForm } from '@/hooks';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '@/components/auth/GoogleSignInButton';
import { useState } from 'react';

const Login = () => {
  const { form, onSubmit, isPending, error } = useLoginForm();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <GoogleLoginButton />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="flex justify-center">
                      <FormControl>
                        <Input
                          type={isPasswordShown ? 'text' : 'password'}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className="cursor-pointer self-center"
                        onClick={() => setIsPasswordShown((prev) => !prev)}
                      >
                        {isPasswordShown ? <FaEye /> : <LuEyeClosed />}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
              {error && <p className="text-red-600">{error.message}</p>}
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary underline">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
