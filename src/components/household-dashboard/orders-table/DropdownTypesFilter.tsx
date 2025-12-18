import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaArrowDown } from 'react-icons/fa';
import { FINANCIAL_ORDER_TYPES } from '@/lib';
import type { Column } from '@tanstack/react-table';

interface Props<TData, TValue> {
  column: Column<TData, TValue>;
}

export const DropdownTypesFilter = <TData, TValue>({
  column,
}: Props<TData, TValue>) => {
  const handleFiilterChange = (filter: string) => {
    column.setFilterValue(filter);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          By type <FaArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Order Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem onClick={() => handleFiilterChange('')}>
          All
        </DropdownMenuCheckboxItem>
        {FINANCIAL_ORDER_TYPES.map((type) => (
          <DropdownMenuCheckboxItem
            id={type}
            onClick={() => handleFiilterChange(type)}
            checked={column.getFilterValue() === type}
            className="capitalize"
          >
            {type}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
