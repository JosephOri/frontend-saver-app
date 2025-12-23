import { useCreateTransaction } from './useTransactions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().optional(),
  type: z.enum(['income', 'expense', 'investment']),
});

export const useCreateTransactionsForm = () => {
  const { mutate: createOrder, isPending } = useCreateTransaction();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: '',
      description: '',
      type: 'expense',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    createOrder(values, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  return { form, onSubmit, isPending, isOpen, setIsOpen };
};
