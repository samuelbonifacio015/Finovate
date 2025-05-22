
export type UserRole = 'user';

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
  currency: 'USD' | 'PEN'; // Limitado a USD y Sol Peruano
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'transfer';

export interface Transaction {
  id: string;
  customId: string; // ID personalizado para búsquedas
  accountId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  time: string; // Hora separada
  relatedAccountId?: string;
}

export interface TransferData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

export interface TransactionFormData {
  customId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  time: string;
}

export interface TransactionUpdate {
  customId?: string;
  description?: string;
  amount?: number;
  date?: string;
  time?: string;
}
