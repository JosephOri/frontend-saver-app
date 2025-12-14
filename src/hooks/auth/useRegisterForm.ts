import { useRegister } from './useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  userName: z.string(),
  email: z.email('Invalid email'),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must contain uppercase, lowercase, number and special char',
    ),
});

export const useRegisterForm = () => {
  const { mutate: register, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', userName: '' },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register(values);
  };

  return { form, onSubmit, isPending };
};
