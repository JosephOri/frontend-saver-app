import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  localStorageKeys,
  SERVER_URL,
  type InboxNotification,
  type InvitationNotification,
} from '@/lib';
import {
  NotificationsContext,
  type NotificationsContexType,
} from './NotificationsContext';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks';

const { NOTIFICATIONS } = localStorageKeys;

interface Props {
  children: ReactNode;
}

export const NotificationsProvider = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<InboxNotification[]>(
    getLocalStorageNotifications(),
  );
  const { data: user } = useCurrentUser();

  useEffect(() => {
    if (!user?.userName) return;
    console.log('Opening SSE connection for:', user.userName);
    const eventSource = new EventSource(
      `${SERVER_URL}/notifications/stream?userName=${user.userName}`,
    );

    eventSource.onmessage = (event) => {
      try {
        const parsedData: InvitationNotification = JSON.parse(event.data);
        toast('You have a new notification', {
          description: parsedData.message,
          action: {
            label: 'Go to inbox',
            onClick: () => window.location.replace('/inbox'),
          },
        });
        const notification = {
          ...parsedData,
        };
        let storedNotifications = getLocalStorageNotifications();
        storedNotifications = [...storedNotifications, notification];

        setLocalStorageNotifications(storedNotifications);
        setNotifications(storedNotifications);
      } catch (err) {
        console.error('Error parsing SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn('SSE Connection issue:', err);
    };
    return () => {
      console.log('Closing SSE connection');
      eventSource.close();
    };
  }, [user?.userName]);

  const clearNotification = useCallback((id: string) => {
    const storedNotifications = getLocalStorageNotifications().filter(
      (n) => n.id !== id,
    );
    setLocalStorageNotifications(storedNotifications);
    setNotifications(storedNotifications);
  }, []);

  const contextValue: NotificationsContexType = useMemo(
    () => ({
      notifications,
      clearNotification,
    }),
    [notifications, clearNotification],
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

function getLocalStorageNotifications() {
  return JSON.parse(localStorage.getItem(NOTIFICATIONS) || '[]');
}

function setLocalStorageNotifications(notifications: InboxNotification) {
  localStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications));
}
