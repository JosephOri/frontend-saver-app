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
import { useRegisterForm } from '@/hooks';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '@/components/auth/GoogleSignInButton';
import { useState } from 'react';

const Register = () => {
  const { form, onSubmit, isPending } = useRegisterForm();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter your credentials to register</CardDescription>
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
                        {isPasswordShown ? <LuEyeClosed /> : <FaEye />}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>userName</FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Registering...' : 'Submit'}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary underline">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
