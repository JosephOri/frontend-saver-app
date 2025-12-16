export interface InvitationNotification {
  adminId: string;
  targetUserName: string;
  householdId: string;
  message?: string;
}

export type InboxNotification = InvitationNotification & { id: string };
