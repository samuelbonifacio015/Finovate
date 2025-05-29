import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import TransferForm from '@/components/TransferForm';
import { useAuth } from '@/contexts/AuthContext';
import { Account, Transaction, TransactionFormData, TransferData } from '@/types/finance';
import { 
  getAccounts, 
  getTransactions, 
  createTransaction, 
  transferFunds 
} from '@/services/financeService';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'sonner';
import { Plus, CreditCard, PiggyBank, TrendingUp, ArrowLeftRight } from 'lucide-react';

const CURRENCY_OPTIONS = [
  { value: 'EUR', label: 'Euros (€)' },
  { value: 'USD', label: 'Dólares ($)' },
  { value: 'PEN', label: 'Soles (S/)' },
];

const Transactions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [currency, setCurrency] = useState(() => localStorage.getItem('finovate_currency') || 'EUR');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadData();
  }, [user, navigate]);

  useEffect(() => {
    localStorage.setItem('finovate_currency', currency);
  }, [currency]);

  const loadData = () => {
    const accountsData = getAccounts();
    const transactionsData = getTransactions();
    setAccounts(accountsData);
    setTransactions(transactionsData);
  };

  const handleCreateTransaction = async (data: TransactionFormData) => {
    setIsLoading(true);
    try {
      // Usar la primera cuenta disponible como ejemplo
      const defaultAccount = accounts.find(acc => acc.type === 'checking') || accounts[0];
      if (!defaultAccount) {
        toast.error('No hay cuentas disponibles');
        return;
      }

      createTransaction(
        defaultAccount.id,
        data.type,
        data.amount,
        data.description,
        data.customId,
        data.date,
        data.time
      );
      
      loadData();
      setIsTransactionDialogOpen(false);
      toast.success('Transacción creada exitosamente');
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Error al crear la transacción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTransfer = async (data: TransferData) => {
    setIsLoading(true);
    try {
      transferFunds(data);
      loadData();
      setIsTransferDialogOpen(false);
      toast.success('Transferencia realizada exitosamente');
    } catch (error) {
      console.error('Error creating transfer:', error);
      toast.error('Error al realizar la transferencia');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <CreditCard className="h-6 w-6 text-blue-600" />;
      case 'savings':
        return <PiggyBank className="h-6 w-6 text-green-600" />;
      case 'investment':
        return <TrendingUp className="h-6 w-6 text-purple-600" />;
      default:
        return <CreditCard className="h-6 w-6 text-gray-600" />;
    }
  };

  const getAccountTypeName = (type: string) => {
    switch (type) {
      case 'checking':
        return 'Cuenta Corriente';
      case 'savings':
        return 'Cuenta de Ahorros';
      case 'investment':
        return 'Cuenta de Inversión';
      case 'credit':
        return 'Tarjeta de Crédito';
      default:
        return 'Cuenta';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Transacciones</h1>
            <p className="text-gray-600 mt-2">Administra tus transacciones y transferencias</p>
          </div>

          {/* Selector de divisa */}
          <div className="mb-6 flex items-center gap-3">
            <label htmlFor="currency-select" className="font-medium text-sm">Divisa:</label>
            <select
              id="currency-select"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {CURRENCY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Resumen de Cuentas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {accounts.map((account) => (
              <Card key={account.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {getAccountTypeName(account.type)}
                  </CardTitle>
                  {getAccountIcon(account.type)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(account.balance, currency)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {account.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Acciones Rápidas */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Transacción
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Transacción</DialogTitle>
                </DialogHeader>
                <TransactionForm
                  onSubmit={handleCreateTransaction}
                  isLoading={isLoading}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  Nueva Transferencia
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Realizar Transferencia</DialogTitle>
                </DialogHeader>
                <TransferForm
                  accounts={accounts}
                  onSubmit={handleCreateTransfer}
                  isLoading={isLoading}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Transacciones */}
          <TransactionList
            transactions={transactions}
            accounts={accounts}
            onTransactionDeleted={loadData}
            onTransactionUpdated={loadData}
            currency={currency}
          />
        </div>
      </main>
    </div>
  );
};

export default Transactions;
