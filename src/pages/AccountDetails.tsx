
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import TransactionList from '@/components/TransactionList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccountForm from '@/components/AccountForm';
import TransferForm from '@/components/TransferForm';
import { Account, Transaction } from '@/types/finance';
import { getAccountById, getAccounts, getTransactions, updateAccount, createTransaction } from '@/services/financeService';
import { formatCurrency, formatShortDate } from '@/utils/formatters';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AccountDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [account, setAccount] = useState<Account | null>(null);
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'edit-account' | 'deposit' | 'withdraw' | 'transfer'>('edit-account');

  // Cargar datos
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!id) return;
    
    const loadData = () => {
      // Cargar cuenta específica
      const accountData = getAccountById(id);
      if (!accountData) {
        toast.error('Cuenta no encontrada');
        navigate('/dashboard');
        return;
      }
      
      // Verificar permisos
      if (user.role !== 'admin' && accountData.userId !== user.id) {
        toast.error('No tienes permisos para ver esta cuenta');
        navigate('/dashboard');
        return;
      }
      
      setAccount(accountData);
      
      // Cargar transacciones de la cuenta
      const accountTransactions = getTransactions(id);
      setTransactions(accountTransactions);
      
      // Cargar todas las cuentas (para transferencias)
      setAllAccounts(getAccounts());
    };
    
    loadData();
  }, [id, user, navigate]);

  const handleEditAccount = async (data: Partial<Account>) => {
    if (!account || !id) return;
    
    setIsLoading(true);
    try {
      const updatedAccount = updateAccount(id, data);
      setAccount(updatedAccount);
      setIsDialogOpen(false);
      toast.success('Cuenta actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar cuenta:', error);
      toast.error('Error al actualizar la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeposit = async (data: { amount: number, description: string }) => {
    if (!account || !id) return;
    
    setIsLoading(true);
    try {
      createTransaction(id, 'deposit', data.amount, data.description);
      
      // Recargar datos
      const updatedAccount = getAccountById(id);
      const updatedTransactions = getTransactions(id);
      
      setAccount(updatedAccount || null);
      setTransactions(updatedTransactions);
      setIsDialogOpen(false);
      
      toast.success('Depósito realizado exitosamente');
    } catch (error) {
      console.error('Error al realizar depósito:', error);
      toast.error('Error al realizar el depósito');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async (data: { amount: number, description: string }) => {
    if (!account || !id) return;
    
    setIsLoading(true);
    try {
      createTransaction(id, 'withdrawal', data.amount, data.description);
      
      // Recargar datos
      const updatedAccount = getAccountById(id);
      const updatedTransactions = getTransactions(id);
      
      setAccount(updatedAccount || null);
      setTransactions(updatedTransactions);
      setIsDialogOpen(false);
      
      toast.success('Retiro realizado exitosamente');
    } catch (error) {
      console.error('Error al realizar retiro:', error);
      toast.error('Error al realizar el retiro');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async (data: { fromAccountId: string; toAccountId: string; amount: number; description: string }) => {
    setIsLoading(true);
    try {
      // La función transferFunds ya actualiza ambas cuentas
      // y crea las transacciones correspondientes
      
      // Recargar datos
      const updatedAccount = getAccountById(id!);
      const updatedTransactions = getTransactions(id);
      const updatedAllAccounts = getAccounts();
      
      setAccount(updatedAccount || null);
      setTransactions(updatedTransactions);
      setAllAccounts(updatedAllAccounts);
      setIsDialogOpen(false);
      
      toast.success('Transferencia realizada exitosamente');
    } catch (error) {
      console.error('Error al realizar transferencia:', error);
      toast.error('Error al realizar la transferencia');
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Componente para el formulario de depósito o retiro
  const TransactionForm = ({ onSubmit, isDeposit }: {
    onSubmit: (data: { amount: number, description: string }) => void,
    isDeposit: boolean
  }) => {
    const formSchema = z.object({
      amount: z.coerce.number()
        .min(0.01, { message: 'El monto debe ser mayor a 0' })
        .refine(
          val => isDeposit || (account && val <= account.balance),
          { message: 'Saldo insuficiente para este retiro' }
        ),
      description: z.string().min(3, { message: 'La descripción debe tener al menos 3 caracteres' }),
    });

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        amount: 0,
        description: '',
      },
    });

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                {!isDeposit && account && (
                  <p className="text-xs text-muted-foreground">
                    Saldo disponible: {formatCurrency(account.balance, account.currency)}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`${isDeposit ? 'Depósito' : 'Retiro'} de efectivo`}
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Procesando...' : isDeposit ? 'Realizar Depósito' : 'Realizar Retiro'}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate('/dashboard')}
            >
              ← Volver al Dashboard
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-finance-primary">{account.name}</h1>
                <p className="text-muted-foreground">
                  {account.type === 'checking' && 'Cuenta Corriente'}
                  {account.type === 'savings' && 'Cuenta de Ahorros'}
                  {account.type === 'investment' && 'Inversión'}
                  {account.type === 'credit' && 'Crédito'}
                  {' • '}
                  ID: {account.id.substring(0, 8)}...
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold">{formatCurrency(account.balance, account.currency)}</div>
                <p className="text-xs text-muted-foreground">
                  Última actualización: {formatShortDate(account.updatedAt)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="col-span-1 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setDialogType('deposit');
                    setIsDialogOpen(true);
                  }}
                >
                  Depositar
                </Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => {
                    setDialogType('withdraw');
                    setIsDialogOpen(true);
                  }}
                  disabled={account.balance <= 0}
                >
                  Retirar
                </Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    setDialogType('transfer');
                    setIsDialogOpen(true);
                  }}
                  disabled={allAccounts.length < 2 || account.balance <= 0}
                >
                  Transferir
                </Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Button 
                  className="w-full" 
                  variant="ghost"
                  onClick={() => {
                    setDialogType('edit-account');
                    setIsDialogOpen(true);
                  }}
                >
                  Editar Cuenta
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="transactions">
              <TabsList>
                <TabsTrigger value="transactions">Transacciones</TabsTrigger>
                <TabsTrigger value="details">Detalles de la Cuenta</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="pt-6">
                <TransactionList 
                  transactions={transactions}
                  accounts={allAccounts}
                  currentAccountId={account.id}
                />
              </TabsContent>
              
              <TabsContent value="details" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalles de la Cuenta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nombre</p>
                        <p className="font-medium">{account.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tipo de Cuenta</p>
                        <p className="font-medium">
                          {account.type === 'checking' && 'Cuenta Corriente'}
                          {account.type === 'savings' && 'Cuenta de Ahorros'}
                          {account.type === 'investment' && 'Inversión'}
                          {account.type === 'credit' && 'Crédito'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Saldo Actual</p>
                        <p className="font-medium">{formatCurrency(account.balance, account.currency)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Moneda</p>
                        <p className="font-medium">{account.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fecha de Creación</p>
                        <p className="font-medium">{formatShortDate(account.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Última Actualización</p>
                        <p className="font-medium">{formatShortDate(account.updatedAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ID de la Cuenta</p>
                        <p className="font-medium">{account.id}</p>
                      </div>
                      {user?.role === 'admin' && (
                        <div>
                          <p className="text-sm text-muted-foreground">ID del Usuario</p>
                          <p className="font-medium">{account.userId}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Diálogos para diferentes acciones */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'edit-account' && 'Editar Cuenta'}
              {dialogType === 'deposit' && 'Realizar Depósito'}
              {dialogType === 'withdraw' && 'Realizar Retiro'}
              {dialogType === 'transfer' && 'Transferir Fondos'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'edit-account' && 'Modifica los detalles de tu cuenta.'}
              {dialogType === 'deposit' && 'Agrega fondos a tu cuenta.'}
              {dialogType === 'withdraw' && 'Retira fondos de tu cuenta.'}
              {dialogType === 'transfer' && 'Transfiere fondos entre tus cuentas.'}
            </DialogDescription>
          </DialogHeader>
          
          {dialogType === 'edit-account' && (
            <AccountForm
              initialData={account}
              onSubmit={handleEditAccount}
              isLoading={isLoading}
            />
          )}
          
          {dialogType === 'deposit' && (
            <TransactionForm onSubmit={handleDeposit} isDeposit={true} />
          )}
          
          {dialogType === 'withdraw' && (
            <TransactionForm onSubmit={handleWithdraw} isDeposit={false} />
          )}
          
          {dialogType === 'transfer' && (
            <TransferForm
              accounts={allAccounts.filter(acc => acc.id !== account.id)}
              fromAccountId={account.id}
              onSubmit={handleTransfer}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountDetails;
