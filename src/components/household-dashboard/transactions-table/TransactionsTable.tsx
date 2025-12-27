import { type Transaction, type RecurringTransaction } from '@repo/shared';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useMemo, useState } from 'react';
import { transactionColumns } from './columns';
import { DropdownTypesFilter } from './DropdownTypesFilter';
import { projectFutureTransactions } from '@/utils/transactionProjection';
import { addMonths } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  historicalData: Transaction[];
  recurringRules?: RecurringTransaction[];
}

export const TransactionsTable = ({
  historicalData,
  recurringRules = [],
}: Props) => {
  const [showFuture, setShowFuture] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);

  const displayedData = useMemo(() => {
    if (!showFuture) return historicalData;

    const projected = projectFutureTransactions(
      recurringRules,
      addMonths(new Date(), 3),
    );

    return [...historicalData, ...projected];
  }, [historicalData, recurringRules, showFuture]);

  const columns: ColumnDef<Transaction>[] = useMemo(
    () => transactionColumns,
    [],
  );

  const table = useReactTable({
    data: displayedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl">Filters</h1>
          <div className="flex flex-wrap items-center gap-4 rounded-md border p-3">
            <DropdownTypesFilter column={table.getColumn('type')!} />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-future"
                checked={showFuture}
                onCheckedChange={(checked: boolean | 'indeterminate') =>
                  setShowFuture(checked === true)
                }
              />
              <Label htmlFor="show-future">Show Projected (1 Year)</Label>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                // @ts-ignore
                const isProjected = row.original.isProjected;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={
                      isProjected ? 'bg-muted/50 italic opacity-80' : ''
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
