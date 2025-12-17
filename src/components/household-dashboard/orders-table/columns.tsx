import { cn, type FinancialOrder } from '@/lib';
import type { ColumnDef } from '@tanstack/react-table';
import { CapitalizedText, TruncatedTextDialog } from '@/components/common';

export const financialOrderColumns: ColumnDef<FinancialOrder>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = String(row.getValue('type'));
      return (
        <div
          className={cn(
            'left font-medium capitalize',
            `${type === 'expense' ? 'text-red-500' : 'text-green-500'}`,
          )}
        >
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = String(row.getValue('category'));

      return <CapitalizedText text={category} />;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = String(row.getValue('description'));
      if (!description) return <div>No description.</div>;

      return <TruncatedTextDialog text={description} title="Description" />;
    },
  },
  {
    accessorKey: 'name',
    header: 'User',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const type = row.getValue('type');
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ILS',
      }).format(amount);

      return (
        <div
          className={cn(
            'left font-medium',
            `${type === 'expense' ? 'text-red-500' : 'text-green-500'}`,
          )}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div>{new Intl.DateTimeFormat('en-IL').format(date)}</div>;
    },
  },
];
