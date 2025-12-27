import { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Transaction } from '@repo/shared';
import { cn } from '@/lib';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#a4de6c',
  '#d0ed57',
];

interface Props {
  expenses: Transaction[];
  className?: string;
}

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-10}
        textAnchor="middle"
        fill={fill}
        className="text-lg font-bold"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={15}
        textAnchor="middle"
        fill="#999"
        className="text-sm"
      >
        {`₪${value.toFixed(0)} (${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 12}
        fill={fill}
      />
    </g>
  );
};

export const ExpensePieChart = ({ expenses, className = '' }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = useMemo(() => {
    if (!expenses) return [];

    const expenseTransactions = expenses.filter((t) => t.type === 'expense');

    const grouped = expenseTransactions.reduce(
      (acc, curr) => {
        const category = curr.category;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += curr.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(grouped)
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <Card className={cn(className, 'flex flex-col')}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[350px] w-full min-w-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
