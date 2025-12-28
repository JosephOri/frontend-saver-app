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
  HOUSEHOLD: 'household',
  CURRENT_USER: 'currentUser',
} as const;
