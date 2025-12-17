import { NotificationCard } from '@/components';
import useNotifications from '@/providers/notifications/useNotifications';

const Inbox = () => {
  const { notifications, clearNotification } = useNotifications();
  return (
    <div className="p-5 text-center">
      <h1 className="mb-3 text-6xl">Your Inbox</h1>
      {notifications.length ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            clearNotification={clearNotification}
          />
        ))
      ) : (
        <h1 className="text-3xl">no notifications yet</h1>
      )}
    </div>
  );
};

export default Inbox;
