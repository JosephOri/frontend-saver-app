import type { InboxNotification } from '@repo/shared';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { useAddMemberToHousehold } from '@/hooks';

interface Props {
  notification: InboxNotification;
  clearNotification: (id: string) => void;
}

export const NotificationCard = ({
  notification,
  clearNotification,
}: Props) => {
  const { mutate: addMember } = useAddMemberToHousehold();

  const handleAcceptInvite = async () => {
    console.log(
      `User accepted invite to household: ${notification.householdId}`,
    );
    const dto = {
      adminId: notification.adminId,
      targetUserName: notification.targetUserName,
    };
    addMember(dto);
  };

  console.log(notification);
  return (
    <Card className="flex max-w-2xl justify-center">
      <CardHeader className="justify-center text-center">
        <CardTitle>New Notification</CardTitle>
        <CardDescription>{notification.message}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center gap-3">
        <Button
          variant="secondary"
          onClick={() => clearNotification(notification.id)}
        >
          clear
        </Button>
        <Button variant="default" onClick={handleAcceptInvite}>
          approve
        </Button>
      </CardFooter>
    </Card>
  );
};
