import { useCreateTransaction } from './useTransactions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { type CreateTransactionDto } from '@/typings/dto/create-transaction.dto';
import type { TransactionType } from '@repo/shared';

const formSchema = z.object({
  amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().optional(),
  type: z.enum(['income', 'expense', 'investment']),
  date: z.date(),
  isRecurring: z.boolean().default(false).optional(),
  recurrenceInterval: z
    .enum(['daily', 'weekly', 'monthly', 'yearly', 'none'])
    .optional(),
  recurrenceEndDate: z.date().optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export const useCreateTransactionsForm = () => {
  const { mutate: createOrder, isPending } = useCreateTransaction();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      amount: 0,
      category: '',
      description: '',
      type: 'expense',
      date: new Date(),
      isRecurring: false,
      recurrenceInterval: 'none',
      recurrenceEndDate: undefined,
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    const isRecurring =
      values.recurrenceInterval && values.recurrenceInterval !== 'none';

    const payload: CreateTransactionDto = {
      ...values,
      type: values.type as TransactionType,
      recurrenceInterval: isRecurring ? values.recurrenceInterval : undefined,
      recurrenceEndDate: isRecurring ? values.recurrenceEndDate : undefined,
    };

    createOrder(payload, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  return { form, onSubmit, isPending, isOpen, setIsOpen };
};
