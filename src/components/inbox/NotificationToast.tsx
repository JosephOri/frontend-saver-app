import { type InvitationNotification } from '@/lib';

interface Props {
  data: InvitationNotification;
  onClose: () => void;
  onAccept: (householdId: string) => void;
}

export const NotificationToast = ({ data, onClose, onAccept }: Props) => {
  return (
    <div className="fixed top-5 right-5 z-50 w-full max-w-sm animate-bounce">
      <div className="overflow-hidden rounded-lg border-r-4 border-indigo-500 bg-white shadow-xl">
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">
              <svg
                className="h-6 w-6 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="mr-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                הוזמנת למשק בית חדש!
              </p>
              <p className="mt-1 text-sm text-gray-500">{data.message}</p>
              <div className="mt-3 flex space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => onAccept(data.householdId)}
                  className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  אשר הזמנה
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                >
                  התעלם
                </button>
              </div>
            </div>
            <div className="mr-4 flex shrink-0">
              <button
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
