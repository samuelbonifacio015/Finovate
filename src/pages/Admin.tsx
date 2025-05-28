
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import AccountCard from '@/components/AccountCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Account, User } from '@/types/finance';
import { getAccounts } from '@/services/financeService';
import { formatCurrency } from '@/utils/formatters';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'usuario@ejemplo.com',
      name: 'Usuario Normal',
      role: 'user',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'admin@ejemplo.com',
      name: 'Administrador',
      role: 'user', // Cambiado de 'admin' a 'user'
      createdAt: new Date().toISOString(),
    }
  ]);

  // Cargar cuentas
  const loadAccounts = () => {
    const allAccounts = getAccounts();
    setAccounts(allAccounts);
  };
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadAccounts();
  }, [user, navigate]);
  
  // Agrupar cuentas por usuario
  const accountsByUser: Record<string, Account[]> = {};
  accounts.forEach((account) => {
    if (!accountsByUser[account.userId]) {
      accountsByUser[account.userId] = [];
    }
    accountsByUser[account.userId].push(account);
  });

  // Calcular balance total por usuario
  const balanceByUser: Record<string, number> = {};
  Object.keys(accountsByUser).forEach((userId) => {
    balanceByUser[userId] = accountsByUser[userId].reduce(
      (sum, account) => sum + account.balance,
      0
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-finance-primary">Panel de Gestión</h1>
              <p className="text-muted-foreground">
                Gestiona usuarios y sus cuentas desde un solo lugar.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Total Usuarios</p>
              <p className="text-3xl font-bold">{users.length}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Usuarios: {users.length}
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Total Cuentas</p>
              <p className="text-3xl font-bold">{accounts.length}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Corriente: {accounts.filter(a => a.type === 'checking').length}
                </span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Ahorro: {accounts.filter(a => a.type === 'savings').length}
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <p className="text-sm text-muted-foreground">Balance Total Sistema</p>
              <p className="text-3xl font-bold">
                {formatCurrency(accounts.reduce((sum, account) => sum + account.balance, 0))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Todas las cuentas de todos los usuarios
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="users" className="mb-8">
            <TabsList>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="accounts">Cuentas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Listado de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Fecha Registro</TableHead>
                        <TableHead>Cuentas</TableHead>
                        <TableHead>Balance Total</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Usuario
                            </span>
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{accountsByUser[user.id]?.length || 0}</TableCell>
                          <TableCell>{formatCurrency(balanceByUser[user.id] || 0)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                alert('En una aplicación real, mostraría el detalle del usuario');
                              }}
                            >
                              Ver
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="accounts" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Listado de Cuentas</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Última Actualización</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accounts.map((account) => {
                        const accountUser = users.find((u) => u.id === account.userId);
                        
                        return (
                          <TableRow key={account.id}>
                            <TableCell className="font-medium">{account.id.substring(0, 8)}...</TableCell>
                            <TableCell>{account.name}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                account.type === 'checking' ? 'bg-blue-100 text-blue-800' : 
                                account.type === 'savings' ? 'bg-green-100 text-green-800' :
                                account.type === 'investment' ? 'bg-purple-100 text-purple-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {account.type === 'checking' && 'Corriente'}
                                {account.type === 'savings' && 'Ahorros'}
                                {account.type === 'investment' && 'Inversión'}
                                {account.type === 'credit' && 'Crédito'}
                              </span>
                            </TableCell>
                            <TableCell>
                              {accountUser ? accountUser.name : 'Desconocido'}
                            </TableCell>
                            <TableCell>{formatCurrency(account.balance, account.currency)}</TableCell>
                            <TableCell>{new Date(account.updatedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/accounts/${account.id}`)}
                              >
                                Ver
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Cuentas por Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {users.map((user) => {
                  const userAccounts = accountsByUser[user.id] || [];
                  const totalBalance = balanceByUser[user.id] || 0;
                  
                  return (
                    <div key={user.id} className="border-b pb-6 last:border-0">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user.email} • Usuario
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="text-sm text-muted-foreground">Balance Total</p>
                          <p className="font-semibold">{formatCurrency(totalBalance)}</p>
                        </div>
                      </div>
                      
                      {userAccounts.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                          Este usuario no tiene cuentas.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {userAccounts.map((account) => (
                            <AccountCard
                              key={account.id}
                              account={account}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
