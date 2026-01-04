import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

interface MonthControlProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

export const MonthControl = ({
  selectedMonth,
  onMonthChange,
}: MonthControlProps) => {
  const handlePrevious = () => {
    onMonthChange(subMonths(selectedMonth, 1));
  };

  const handleNext = () => {
    onMonthChange(addMonths(selectedMonth, 1));
  };

  return (
    <div className="bg-muted/20 flex items-center gap-4 rounded-lg p-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="min-w-32 text-center text-lg font-semibold">
        {format(selectedMonth, 'MMMM yyyy')}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
