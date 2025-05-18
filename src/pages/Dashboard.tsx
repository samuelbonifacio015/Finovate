
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import AccountCard from '@/components/AccountCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountForm from '@/components/AccountForm';
import TransferForm from '@/components/TransferForm';
import { Account } from '@/types/finance';
import { getAccounts, createAccount, deleteAccount, initializeExampleData, transferFunds } from '@/services/financeService';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [dialogType, setDialogType] = useState<'create-account' | 'transfer'>('create-account');

  // Cargar cuentas
  const loadAccounts = () => {
    const userAccounts = getAccounts();
    setAccounts(userAccounts);
    
    // Calcular balance total
    const total = userAccounts.reduce((sum, account) => sum + account.balance, 0);
    setTotalBalance(total);
  };
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Inicializar datos de ejemplo si es necesario
    initializeExampleData();
    
    // Cargar cuentas
    loadAccounts();
  }, [user, navigate]);
  
  const handleCreateAccount = async (data: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      createAccount(data);
      setIsDialogOpen(false);
      loadAccounts();
      toast.success('Cuenta creada exitosamente');
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      toast.error('Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteAccount = async (accountId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta cuenta? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setIsLoading(true);
    try {
      deleteAccount(accountId);
      loadAccounts();
      toast.success('Cuenta eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      toast.error('Error al eliminar la cuenta');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTransfer = async (data: { fromAccountId: string; toAccountId: string; amount: number; description: string }) => {
    setIsLoading(true);
    try {
      transferFunds(data);
      setIsDialogOpen(false);
      loadAccounts();
      toast.success('Transferencia realizada exitosamente');
    } catch (error) {
      console.error('Error al realizar transferencia:', error);
      toast.error('Error al realizar la transferencia');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-finance-primary">{user?.role === 'admin' ? 'Panel de Administrador' : 'Mi Dashboard'}</h1>
              <p className="text-muted-foreground">
                Bienvenido, {user?.name}. Gestiona tus finanzas personales.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setDialogType('transfer');
                  setIsDialogOpen(true);
                }}
                disabled={accounts.length < 2}
              >
                Realizar Transferencia
              </Button>
              
              <Button 
                onClick={() => {
                  setDialogType('create-account');
                  setIsDialogOpen(true);
                }}
              >
                Nueva Cuenta
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat-card bg-gradient-to-br from-finance-primary to-finance-primary/90 text-white">
              <p className="text-sm text-white/80">Balance Total</p>
              <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
              <p className="text-xs mt-2">Actualizado: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Total Cuentas</p>
              <p className="text-3xl font-bold">{accounts.length}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Corriente: {accounts.filter(a => a.type === 'checking').length}
                </span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Ahorro: {accounts.filter(a => a.type === 'savings').length}
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Última Actividad</p>
              <p className="text-base font-medium mt-1">Sesión iniciada</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleString()}</p>
            </div>
          </div>
          
          {accounts.length === 0 ? (
            <div className="bg-white p-12 rounded-lg border border-border text-center">
              <h2 className="text-xl font-semibold mb-4">No tienes cuentas aún</h2>
              <p className="text-muted-foreground mb-6">
                Comienza creando tu primera cuenta para gestionar tus finanzas
              </p>
              <Button
                onClick={() => {
                  setDialogType('create-account');
                  setIsDialogOpen(true);
                }}
              >
                Crear Mi Primera Cuenta
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onDelete={() => handleDeleteAccount(account.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Diálogo para crear cuenta o hacer transferencia */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'create-account' ? 'Crear Nueva Cuenta' : 'Realizar Transferencia'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'create-account' 
                ? 'Completa los detalles para crear una nueva cuenta bancaria.'
                : 'Transfiere fondos entre tus cuentas.'}
            </DialogDescription>
          </DialogHeader>
          
          {dialogType === 'create-account' ? (
            <AccountForm
              onSubmit={handleCreateAccount}
              isLoading={isLoading}
            />
          ) : (
            <TransferForm
              accounts={accounts}
              onSubmit={handleTransfer}
              isLoading={isLoading}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
