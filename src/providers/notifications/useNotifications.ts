import { useContext } from 'react';
import {
  NotificationsContext,
  type NotificationsContexType,
} from './NotificationsContext';

const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider',
    );
  }

  return context as NotificationsContexType;
};

export default useNotifications;
