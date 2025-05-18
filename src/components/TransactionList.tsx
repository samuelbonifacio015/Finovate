
import React from 'react';
import { Transaction, Account } from '@/types/finance';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface TransactionListProps {
  transactions: Transaction[];
  accounts: Account[]; // Para obtener nombres de cuentas en transferencias
  currentAccountId?: string; // ID de la cuenta actual para determinar dirección en transferencias
}

// Función para obtener el icono según el tipo de transacción
const getTransactionIcon = (transaction: Transaction) => {
  switch (transaction.type) {
    case 'deposit':
      return <span className="text-green-500 text-2xl">↓</span>;
    case 'withdrawal':
      return <span className="text-red-500 text-2xl">↑</span>;
    case 'transfer':
      return <span className="text-blue-500 text-2xl">↔</span>;
    default:
      return <span className="text-gray-500 text-2xl">•</span>;
  }
};

// Función para mostrar el tipo de transacción
const getTransactionType = (transaction: Transaction) => {
  switch (transaction.type) {
    case 'deposit':
      return 'Depósito';
    case 'withdrawal':
      return 'Retiro';
    case 'transfer':
      return 'Transferencia';
    default:
      return 'Transacción';
  }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, accounts, currentAccountId }) => {
  // Ordenar transacciones por fecha, más reciente primero
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getAccountName = (accountId: string): string => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Cuenta desconocida';
  };

  const getAmountClass = (transaction: Transaction): string => {
    if (!currentAccountId) return '';

    if (transaction.type === 'deposit') {
      return 'text-green-600 font-semibold';
    }
    
    if (transaction.type === 'withdrawal') {
      return 'text-red-600 font-semibold';
    }
    
    if (transaction.type === 'transfer') {
      // Si es una transferencia, depende de si es saliente o entrante
      if (transaction.accountId === currentAccountId) {
        return 'text-red-600 font-semibold';
      } else if (transaction.relatedAccountId === currentAccountId) {
        return 'text-green-600 font-semibold';
      }
    }
    
    return '';
  };

  const getFormattedAmount = (transaction: Transaction): string => {
    const account = accounts.find(acc => acc.id === transaction.accountId);
    const currency = account ? account.currency : 'USD';
    
    if (!currentAccountId) {
      return formatCurrency(transaction.amount, currency);
    }
    
    if (transaction.type === 'deposit') {
      return `+${formatCurrency(transaction.amount, currency)}`;
    }
    
    if (transaction.type === 'withdrawal') {
      return `-${formatCurrency(transaction.amount, currency)}`;
    }
    
    if (transaction.type === 'transfer') {
      // Si es una transferencia, depende de si es saliente o entrante
      if (transaction.accountId === currentAccountId) {
        return `-${formatCurrency(transaction.amount, currency)}`;
      } else if (transaction.relatedAccountId === currentAccountId) {
        return `+${formatCurrency(transaction.amount, currency)}`;
      }
    }
    
    return formatCurrency(transaction.amount, currency);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border">
      <h3 className="font-semibold text-lg p-4 border-b">
        Historial de Transacciones
      </h3>
      
      {sortedTransactions.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No hay transacciones para mostrar.
        </div>
      ) : (
        <div className="divide-y">
          {sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="flex items-center">
                <div className="mr-3">
                  {getTransactionIcon(transaction)}
                </div>
                <div>
                  <div className="font-medium">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>{getTransactionType(transaction)}</span>
                    {transaction.relatedAccountId && (
                      <>
                        <span>•</span>
                        <span>
                          {transaction.accountId === currentAccountId 
                            ? `A: ${getAccountName(transaction.relatedAccountId)}` 
                            : `De: ${getAccountName(transaction.accountId)}`}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>
              <div className={getAmountClass(transaction)}>
                {getFormattedAmount(transaction)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
