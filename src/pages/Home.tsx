import { FinancialInfo } from '@/components';
import { useTransactions } from '@/hooks';

const Home = () => {
  const { data: transactions } = useTransactions();
  return (
    <>
      <FinancialInfo transactions={transactions || []} />
    </>
  );
};

export default Home;
