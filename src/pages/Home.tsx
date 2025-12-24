import { FormatedNisCurrency } from '@/components';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrentUser, useTransactions } from '@/hooks';
import { cn } from '@/lib';
import { Wallet } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: transactions } = useTransactions();
  const balanceAmmount = useMemo(() => {
    return transactions?.reduce((sum, o) => sum + o.amount, 0) || 0;
  }, [transactions]);
  return (
    <div className="flex flex-col gap-6 p-10">
      <h1 className="text-2xl font-bold">Your wallets</h1>
      <Link to="/dashboard">
        <Card className="hover:bg-accent/50 w-fit cursor-pointer transition-colors">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-amber-100 p-3">
              <Wallet className="h-6 w-6 text-amber-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground text-lg font-semibold">
                Cash Wallet``
              </span>
              <span
                className={cn(
                  'text-lg font-bold',
                  balanceAmmount >= 0 ? 'text-green-500' : 'text-red-500',
                )}
              >
                <FormatedNisCurrency amount={balanceAmmount} />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default Home;
