import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrentUser } from '@/hooks';
import { apiClient } from '@/lib';
import { type InvitationNotification } from '@repo/shared';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { FcInvite } from 'react-icons/fc';
import { SidebarMenuButton } from '../ui/sidebar';

export const AddMemberDialog = () => {
  const { data: user } = useCurrentUser();
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handlesubmit');

    if (!user) {
      console.log('no user');
      return;
    }

    try {
      const payload: InvitationNotification = {
        adminId: user.id,
        householdId: user.householdId || '',
        targetUserName: userName,
      };
      console.log(payload);
      await apiClient.post('household/invite', payload);
      toast.success('Invitation has been sent');
      setUserName('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to send invitation');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton className="cursor-pointer">
          <FcInvite />
          <span>Invite a Member</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Add a member</DialogTitle>
            <DialogDescription>
              Add a new member to your household by entering the username of who
              you want to invite
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="userName"
                type="text"
                placeholder="johnDoe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Send Invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
