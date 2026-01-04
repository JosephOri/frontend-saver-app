export * from './urls';
export * from './routes';

export const localStorageKeys = {
  NOTIFICATIONS: 'notifications',
} as const;

export const queryKeys = {
  CATEGORIES: 'categories',
  TRANSACTIONS: 'transactions',
  RECURRING_TRANSACTIONS: 'recurringTransactions',
  DATE_TRANSACTION: 'dateTransaction',
  FORECAST: 'forecast',
  HOUSEHOLD: 'household',
  CURRENT_USER: 'currentUser',
} as const;

export const urlSuffixes = {
  CATEGORIES: '/categories',
  TRANSACTIONS: '/transactions',
  RECURRING_TRANSACTIONS: '/transactions/recurring',
  FORECAST: '/transactions/forecast',
  DATE_TRANSACTION: '/transactions/date',
  HOUSEHOLD: '/household',
  CURRENT_USER: '/users/me',
  ADD_USER_TO_HOUSEHOLD: '/users/add-to-household',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SIGNUP: '/auth/signup',
};
