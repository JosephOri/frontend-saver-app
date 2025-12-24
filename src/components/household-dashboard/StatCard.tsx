import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';
import { FormatedNisCurrency } from '../common';
import { cn } from '@/lib';
import { useIsMobile } from '@/hooks/use-mobile';

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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
