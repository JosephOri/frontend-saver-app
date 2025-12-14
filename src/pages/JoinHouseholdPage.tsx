import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useCreateHousehold, useCurrentUser } from '@/hooks';
import { Navigate } from 'react-router-dom';

const JoinHouseholdPage = () => {
  const { mutate: createHousehold, isPending: isCreateNewHouseholdPending } =
    useCreateHousehold();
  const { data: user } = useCurrentUser();
  const handleCreateNewHousehold = () => {
    createHousehold();
  };

  if (user?.householdId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="p-4 text-7xl">joins household</h1>
      <h1 className="text-3xl">
        it dosent seems that you are part of any household
      </h1>
      <Button onClick={handleCreateNewHousehold}>
        {isCreateNewHouseholdPending ? <Spinner /> : 'create'}
      </Button>
    </div>
  );
};

export default JoinHouseholdPage;
