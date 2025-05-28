
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import FinancialStats from '@/components/FinancialStats';
import MonthlyEvolutionChart from '@/components/MonthlyEvolutionChart';
import ExpenseCategoriesChart from '@/components/ExpenseCategoriesChart';
import BudgetAlerts from '@/components/BudgetAlerts';
import ChatButton from '@/components/ChatButton';
import { useAuth } from '@/contexts/AuthContext';
import { initializeExampleData } from '@/services/financeService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Inicializar datos de ejemplo
    initializeExampleData();
  }, [user, navigate]);

  // Datos de ejemplo para el dashboard
  const monthlyData = [
    { month: 'Ene', ingresos: 3500, gastos: 2800, ahorros: 700 },
    { month: 'Feb', ingresos: 3200, gastos: 2650, ahorros: 550 },
    { month: 'Mar', ingresos: 3800, gastos: 3100, ahorros: 700 },
    { month: 'Abr', ingresos: 3600, gastos: 2900, ahorros: 700 },
    { month: 'May', ingresos: 3900, gastos: 3200, ahorros: 700 },
    { month: 'Jun', ingresos: 3700, gastos: 3000, ahorros: 700 },
  ];

  const categoryData = [
    { category: 'Alimentación', amount: 800, color: '#ef4444', percentage: 35 },
    { category: 'Transporte', amount: 400, color: '#f97316', percentage: 17 },
    { category: 'Entretenimiento', amount: 300, color: '#eab308', percentage: 13 },
    { category: 'Servicios', amount: 500, color: '#22c55e', percentage: 22 },
    { category: 'Otros', amount: 300, color: '#3b82f6', percentage: 13 },
  ];

  const budgetAlerts = [
    {
      id: '1',
      category: 'Alimentación',
      budgetAmount: 900,
      spentAmount: 850,
      percentage: 94,
      status: 'warning' as const
    },
    {
      id: '2',
      category: 'Entretenimiento',
      budgetAmount: 250,
      spentAmount: 300,
      percentage: 120,
      status: 'danger' as const
    },
    {
      id: '3',
      category: 'Transporte',
      budgetAmount: 500,
      spentAmount: 350,
      percentage: 70,
      status: 'safe' as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
            <div className="mt-2">
              <p className="text-3xl font-bold text-gray-900">$17,540.00</p>
              <p className="text-gray-600">Saldo total en todas tus cuentas</p>
            </div>
          </div>

          {/* Estadísticas principales */}
          <FinancialStats
            totalIncome={3700}
            totalExpenses={3000}
            savings={700}
            monthlyBudget={3500}
            budgetUsed={3000}
            goalsProgress={68}
          />

          {/* Gráficos y análisis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <MonthlyEvolutionChart data={monthlyData} />
            <ExpenseCategoriesChart data={categoryData} />
          </div>

          {/* Alertas y acciones rápidas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BudgetAlerts alerts={budgetAlerts} />
            
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/accounts/demo-account')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  Ver Transacciones Detalladas
                </Button>
                <Button 
                  onClick={() => navigate('/goals')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  Gestionar Metas Financieras
                </Button>
                <Button 
                  onClick={() => navigate('/profile')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  Configurar Presupuestos
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resumen de objetivos */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Objetivos del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">Ahorros</h4>
                  <p className="text-2xl font-bold text-green-600">€700</p>
                  <p className="text-sm text-green-600">Meta: €800 (87.5%)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Inversiones</h4>
                  <p className="text-2xl font-bold text-blue-600">€500</p>
                  <p className="text-sm text-blue-600">Meta: €500 (100%)</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Metas</h4>
                  <p className="text-2xl font-bold text-purple-600">3 activas</p>
                  <p className="text-sm text-purple-600">Progreso promedio: 68%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <ChatButton />
    </div>
  );
};

export default Dashboard;
