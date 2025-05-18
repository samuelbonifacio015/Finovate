
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type AccountType = 'checking' | 'savings' | 'investment' | 'credit';

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'transfer';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  relatedAccountId?: string;
}

export interface TransferData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}
