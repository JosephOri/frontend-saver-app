import { type InboxNotification } from '@repo/shared';
import { createContext } from 'react';

export interface NotificationsContexType {
  notifications: InboxNotification[];
  clearNotification: (id: string) => void;
}

export const NotificationsContext =
  createContext<NotificationsContexType | null>(null);
