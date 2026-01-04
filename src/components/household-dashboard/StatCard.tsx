import { Card, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';
import { FormatedNisCurrency } from '../common';
import { cn } from '@/lib';

interface Props {
  title: string;
  value: number;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export const StatCard = ({ title, value, className = '' }: Props) => {
  return (
    <Card className={cn('flex flex-col gap-2 p-4', className)}>
      <CardTitle className="text-muted-foreground text-sm font-medium">
        {title}
      </CardTitle>
      <div
        className={cn(
          'text-2xl font-bold',
          title === 'Total Expenses' && 'text-red-500',
          title === 'Total Income' && 'text-green-500',
        )}
      >
        <FormatedNisCurrency amount={value} />
      </div>
    </Card>
  );
};
