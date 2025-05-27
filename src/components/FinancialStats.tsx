
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, AlertTriangle, Target } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface FinancialStatsProps {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  monthlyBudget: number;
  budgetUsed: number;
  goalsProgress: number;
}

const FinancialStats: React.FC<FinancialStatsProps> = ({
  totalIncome,
  totalExpenses,
  savings,
  monthlyBudget,
  budgetUsed,
  goalsProgress
}) => {
  const budgetPercentage = (budgetUsed / monthlyBudget) * 100;
  const isOverBudget = budgetPercentage > 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
              <p className="text-sm text-gray-600">Ingresos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
              <p className="text-sm text-gray-600">Gastos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <PiggyBank className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(savings)}</p>
              <p className="text-sm text-gray-600">Ahorros</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isOverBudget ? 'bg-red-100' : 'bg-orange-100'}`}>
              <DollarSign className={`h-6 w-6 ${isOverBudget ? 'text-red-600' : 'text-orange-600'}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-orange-600'}`}>
                {Math.round(budgetPercentage)}%
              </p>
              <p className="text-sm text-gray-600">Presupuesto</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isOverBudget ? 'bg-red-100' : 'bg-yellow-100'}`}>
              <AlertTriangle className={`h-6 w-6 ${isOverBudget ? 'text-red-600' : 'text-yellow-600'}`} />
            </div>
            <div>
              <p className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                {isOverBudget ? 'Presupuesto Excedido' : 'Dentro del Presupuesto'}
              </p>
              <p className="text-xs text-gray-500">
                {formatCurrency(budgetUsed)} / {formatCurrency(monthlyBudget)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{Math.round(goalsProgress)}%</p>
              <p className="text-sm text-gray-600">Metas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStats;
