import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';
import { FormatedNisCurrency } from '../common';
import { cn } from '@/lib';

interface Props {
  title: 'Total Expenses' | 'Total Income' | 'Balance';
  value: number;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  className = '',
}: Props) => {
  return (
    <Card className={cn(className)}>
      <CardContent className="md:grid md:grid-cols-2 md:items-center md:gap-1">
        <CardTitle className="font-medium text-nowrap">{title}</CardTitle>
        <div
          className={cn(
            'font-bold md:text-2xl',
            'whitespace-nowrap',
            title === 'Total Expenses' && 'text-red-500',
            title === 'Total Income' && 'text-green-500',
            title === 'Balance' &&
              (value >= 0 ? 'text-green-500' : 'text-red-500'),
          )}
        >
          <FormatedNisCurrency amount={value} />
        </div>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
        <Icon className="text-muted-foreground h-6 w-6" />
      </CardContent>
    </Card>
  );
};
