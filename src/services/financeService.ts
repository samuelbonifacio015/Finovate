
import { Account, AccountType, Transaction, TransactionType, TransferData } from '../types/finance';
import { getCurrentUser } from './authService';
import { toast } from 'sonner';

// Claves de localStorage
const ACCOUNTS_KEY = 'finance_accounts';
const TRANSACTIONS_KEY = 'finance_transactions';

// Obtener las cuentas del almacenamiento local
export const getAccounts = (): Account[] => {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
    const currentUser = getCurrentUser();
    
    if (!currentUser) return [];
    
    // Filtrar por usuario actual a menos que sea administrador
    if (currentUser.role === 'admin') {
      return accounts;
    } else {
      return accounts.filter((account: Account) => account.userId === currentUser.id);
    }
  } catch (error) {
    console.error('Error al obtener cuentas:', error);
    return [];
  }
};

// Obtener una cuenta por ID
export const getAccountById = (id: string): Account | undefined => {
  const accounts = getAccounts();
  return accounts.find(account => account.id === id);
};

// Crear una nueva cuenta
export const createAccount = (accountData: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Account => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    toast.error('Debes iniciar sesión para crear una cuenta');
    throw new Error('Usuario no autenticado');
  }
  
  const allAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
  
  const newAccount: Account = {
    id: `acc_${Math.random().toString(36).substring(2, 10)}`,
    userId: currentUser.id,
    ...accountData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  allAccounts.push(newAccount);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(allAccounts));
  
  toast.success(`Cuenta ${newAccount.name} creada`);
  return newAccount;
};

// Actualizar una cuenta existente
export const updateAccount = (id: string, updates: Partial<Account>): Account => {
  const allAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
  const accountIndex = allAccounts.findIndex((acc: Account) => acc.id === id);
  
  if (accountIndex === -1) {
    toast.error('Cuenta no encontrada');
    throw new Error('Cuenta no encontrada');
  }
  
  // Verificar permiso
  const currentUser = getCurrentUser();
  if (!currentUser || (currentUser.role !== 'admin' && allAccounts[accountIndex].userId !== currentUser.id)) {
    toast.error('No tienes permiso para modificar esta cuenta');
    throw new Error('Permiso denegado');
  }
  
  // Actualizar la cuenta
  allAccounts[accountIndex] = {
    ...allAccounts[accountIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(allAccounts));
  toast.success('Cuenta actualizada');
  
  return allAccounts[accountIndex];
};

// Eliminar una cuenta
export const deleteAccount = (id: string): boolean => {
  const allAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
  const account = allAccounts.find((acc: Account) => acc.id === id);
  
  if (!account) {
    toast.error('Cuenta no encontrada');
    throw new Error('Cuenta no encontrada');
  }
  
  // Verificar permiso
  const currentUser = getCurrentUser();
  if (!currentUser || (currentUser.role !== 'admin' && account.userId !== currentUser.id)) {
    toast.error('No tienes permiso para eliminar esta cuenta');
    throw new Error('Permiso denegado');
  }
  
  // Eliminar cuenta
  const updatedAccounts = allAccounts.filter((acc: Account) => acc.id !== id);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
  
  // También debemos eliminar las transacciones asociadas a esta cuenta
  const allTransactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
  const updatedTransactions = allTransactions.filter(
    (transaction: Transaction) => transaction.accountId !== id && transaction.relatedAccountId !== id
  );
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updatedTransactions));
  
  toast.success('Cuenta eliminada');
  return true;
};

// Obtener transacciones de una cuenta
export const getTransactions = (accountId?: string): Transaction[] => {
  try {
    const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
    
    if (accountId) {
      return transactions.filter((transaction: Transaction) => 
        transaction.accountId === accountId || transaction.relatedAccountId === accountId
      );
    }
    
    return transactions;
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    return [];
  }
};

// Crear una nueva transacción
export const createTransaction = (
  accountId: string, 
  type: TransactionType, 
  amount: number, 
  description: string,
  relatedAccountId?: string
): Transaction => {
  const account = getAccountById(accountId);
  
  if (!account) {
    toast.error('Cuenta no encontrada');
    throw new Error('Cuenta no encontrada');
  }
  
  // Verificar permiso
  const currentUser = getCurrentUser();
  if (!currentUser || (currentUser.role !== 'admin' && account.userId !== currentUser.id)) {
    toast.error('No tienes permiso para esta operación');
    throw new Error('Permiso denegado');
  }
  
  // Validar el saldo para retiro o transferencia
  if ((type === 'withdrawal' || type === 'transfer') && account.balance < amount) {
    toast.error('Saldo insuficiente');
    throw new Error('Saldo insuficiente');
  }
  
  // Crear la transacción
  const newTransaction: Transaction = {
    id: `tx_${Math.random().toString(36).substring(2, 10)}`,
    accountId,
    type,
    amount,
    description,
    date: new Date().toISOString(),
    relatedAccountId,
  };
  
  // Actualizar el saldo de la cuenta
  let newBalance = account.balance;
  if (type === 'deposit') {
    newBalance += amount;
  } else if (type === 'withdrawal' || type === 'transfer') {
    newBalance -= amount;
  }
  
  updateAccount(accountId, { balance: newBalance });
  
  // Guardar la transacción
  const allTransactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
  allTransactions.push(newTransaction);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(allTransactions));
  
  return newTransaction;
};

// Realizar una transferencia entre cuentas
export const transferFunds = (transferData: TransferData): { fromTransaction: Transaction; toTransaction: Transaction } => {
  const { fromAccountId, toAccountId, amount, description } = transferData;
  
  if (fromAccountId === toAccountId) {
    toast.error('No puedes transferir a la misma cuenta');
    throw new Error('No puedes transferir a la misma cuenta');
  }
  
  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);
  
  if (!fromAccount || !toAccount) {
    toast.error('Una de las cuentas no existe');
    throw new Error('Una de las cuentas no existe');
  }
  
  // Verificar permiso
  const currentUser = getCurrentUser();
  if (!currentUser || (currentUser.role !== 'admin' && fromAccount.userId !== currentUser.id)) {
    toast.error('No tienes permiso para esta operación');
    throw new Error('Permiso denegado');
  }
  
  // Verificar saldo suficiente
  if (fromAccount.balance < amount) {
    toast.error('Saldo insuficiente para la transferencia');
    throw new Error('Saldo insuficiente');
  }
  
  // Crear transacción de retiro
  const fromTransaction = createTransaction(
    fromAccountId,
    'transfer',
    amount,
    `Transferencia a ${toAccount.name}: ${description}`,
    toAccountId
  );
  
  // Crear transacción de depósito en la cuenta destino
  const toTransaction = createTransaction(
    toAccountId,
    'deposit',
    amount,
    `Transferencia de ${fromAccount.name}: ${description}`,
    fromAccountId
  );
  
  toast.success('Transferencia realizada con éxito');
  
  return { fromTransaction, toTransaction };
};

// Inicializar datos de ejemplo
export const initializeExampleData = () => {
  // Solo inicializar si no hay datos
  const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]');
  const transactions = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY) || '[]');
  
  if (accounts.length === 0) {
    // Crear cuentas de ejemplo para el usuario normal
    const exampleAccounts: Account[] = [
      {
        id: 'acc_user_checking',
        userId: '1', // ID del usuario normal
        name: 'Cuenta Corriente',
        type: 'checking',
        balance: 2500,
        currency: 'USD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'acc_user_savings',
        userId: '1',
        name: 'Cuenta de Ahorros',
        type: 'savings',
        balance: 15000,
        currency: 'USD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'acc_admin_checking',
        userId: '2', // ID del administrador
        name: 'Cuenta Principal',
        type: 'checking',
        balance: 5000,
        currency: 'USD',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(exampleAccounts));
    
    // Crear algunas transacciones de ejemplo
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const exampleTransactions: Transaction[] = [
      {
        id: 'tx_1',
        accountId: 'acc_user_checking',
        type: 'deposit',
        amount: 1000,
        description: 'Depósito inicial',
        date: new Date(now.getTime() - 7 * oneDay).toISOString(),
      },
      {
        id: 'tx_2',
        accountId: 'acc_user_checking',
        type: 'withdrawal',
        amount: 50,
        description: 'Retiro cajero automático',
        date: new Date(now.getTime() - 5 * oneDay).toISOString(),
      },
      {
        id: 'tx_3',
        accountId: 'acc_user_checking',
        type: 'transfer',
        amount: 500,
        description: 'Transferencia a ahorros',
        date: new Date(now.getTime() - 2 * oneDay).toISOString(),
        relatedAccountId: 'acc_user_savings',
      },
      {
        id: 'tx_4',
        accountId: 'acc_user_savings',
        type: 'deposit',
        amount: 500,
        description: 'Transferencia desde cuenta corriente',
        date: new Date(now.getTime() - 2 * oneDay).toISOString(),
        relatedAccountId: 'acc_user_checking',
      },
    ];
    
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(exampleTransactions));
  }
};
