import { type RecurringTransaction, type Transaction } from '@repo/shared';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  isAfter,
  isBefore,
  parseISO,
} from 'date-fns';

export const projectFutureTransactions = (
  rules: RecurringTransaction[],
  endDate: Date,
): Transaction[] => {
  const projected: Transaction[] = [];

  rules.forEach((rule) => {
    let currentDate =
      typeof rule.nextRunDate === 'string'
        ? parseISO(rule.nextRunDate)
        : rule.nextRunDate;
    const recurrenceEnd = rule.endDate
      ? typeof rule.endDate === 'string'
        ? parseISO(rule.endDate)
        : rule.endDate
      : null;

    while (isBefore(currentDate, endDate)) {
      if (recurrenceEnd && isAfter(currentDate, recurrenceEnd)) {
        break;
      }

      projected.push({
        id: `future-${rule.id}-${currentDate.getTime()}`,
        name: rule.name,
        amount: rule.amount,
        date: currentDate.toISOString(),
        category: rule.category as any, // Cast because category string vs typed union mismatch might occur
        type: rule.type,
        description: rule.description,
        householdId: rule.householdId,
        // Helper property to identify projected
        // @ts-ignore
        isProjected: true,
      });

      switch (rule.interval) {
        case 'daily':
          currentDate = addDays(currentDate, 1);
          break;
        case 'weekly':
          currentDate = addWeeks(currentDate, 1);
          break;
        case 'monthly':
          currentDate = addMonths(currentDate, 1);
          break;
        case 'yearly':
          currentDate = addYears(currentDate, 1);
          break;
      }
    }
  });

  return projected;
};
