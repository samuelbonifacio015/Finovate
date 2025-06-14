import React, { useState } from 'react';
import { Transaction, Account } from '@/types/finance';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { TrashIcon, Search, PencilIcon, Download } from 'lucide-react';
import { deleteTransaction } from '@/services/financeService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TransactionEditForm from '@/components/TransactionEditForm';

interface TransactionListProps {
  transactions: Transaction[];
  accounts: Account[];
  currentAccountId?: string;
  onTransactionDeleted?: () => void;
  onTransactionUpdated?: () => void;
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

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  accounts, 
  currentAccountId,
  onTransactionDeleted,
  onTransactionUpdated
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Filtrar transacciones por ID personalizado o descripción
  // Añadir comprobaciones para evitar llamar a toLowerCase() en valores undefined
  const filteredTransactions = transactions.filter(tx => 
    (tx.customId?.toLowerCase() || '').includes((searchTerm || '').toLowerCase()) || 
    (tx.description?.toLowerCase() || '').includes((searchTerm || '').toLowerCase())
  );

  // Ordenar transacciones por fecha, más reciente primero
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => {
      const dateA = new Date(`${a.date}T${a.time || '00:00:00'}`).getTime();
      const dateB = new Date(`${b.date}T${b.time || '00:00:00'}`).getTime();
      return dateB - dateA;
    }
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

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta transacción? Esta acción revertirá el efecto en el saldo de la cuenta.')) {
      try {
        deleteTransaction(id);
        if (onTransactionDeleted) {
          onTransactionDeleted();
        }
      } catch (error) {
        console.error("Error al eliminar la transacción:", error);
        toast.error("No se pudo eliminar la transacción");
      }
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleTransactionUpdated = () => {
    setIsEditDialogOpen(false);
    setSelectedTransaction(null);
    if (onTransactionUpdated) {
      onTransactionUpdated();
    }
    toast.success("Transacción actualizada exitosamente");
  };

  const handleExportAllTransactions = () => {
    try {
      // Crea un archivo JSON con todas las transacciones y lo descarga
      const dataStr = JSON.stringify(sortedTransactions, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'transacciones.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Transacciones exportadas exitosamente');
    } catch (error) {
      console.error('Error al exportar transacciones:', error);
      toast.error('No se pudieron exportar las transacciones');
    }
  };

  const handleExportTransaction = (transaction: Transaction) => {
    try {
      // Crea un archivo JSON para la transacción seleccionada y lo descarga
      const dataStr = JSON.stringify(transaction, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `transaccion-${transaction.customId || transaction.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Transacción exportada exitosamente');
    } catch (error) {
      console.error('Error al exportar transacción:', error);
      toast.error('No se pudo exportar la transacción');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg mb-3">
            Historial de Transacciones
          </h3>
          <div className="relative flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por ID o descripción..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={handleExportAllTransactions}
            >
              <Download size={16} />
              Exportar JSON
            </Button>
          </div>
        </div>
        
        {sortedTransactions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {searchTerm ? 'No se encontraron transacciones que coincidan con la búsqueda.' : 'No hay transacciones para mostrar.'}
          </div>
        ) : (
          <div className="divide-y">
            {sortedTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 flex justify-between items-start hover:bg-muted/20">
                <div className="flex items-center">
                  <div className="mr-3">
                    {getTransactionIcon(transaction)}
                  </div>
                  <div>
                    <div className="font-medium">
                      {transaction.description}
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-2">
                      <span>{getTransactionType(transaction)}</span>
                      {transaction.relatedAccountId && (
                        <>
                          <span className="inline-block">•</span>
                          <span>
                            {transaction.accountId === currentAccountId 
                              ? `A: ${getAccountName(transaction.relatedAccountId)}` 
                              : `De: ${getAccountName(transaction.accountId)}`}
                          </span>
                        </>
                      )}
                      <span className="inline-block">•</span>
                      <span>{transaction.date} {(transaction.time || '').substring(0, 5)}</span>
                      <span className="inline-block">•</span>
                      <span className="text-xs bg-slate-100 rounded px-2 py-0.5">
                        ID: {transaction.customId || ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={getAmountClass(transaction)}>
                    {getFormattedAmount(transaction)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      <PencilIcon size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-green-500 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleExportTransaction(transaction)}
                    >
                      <Download size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cuadro de edición de transacción */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Transacción</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <TransactionEditForm 
              transaction={selectedTransaction}
              onSuccess={handleTransactionUpdated}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionList;
