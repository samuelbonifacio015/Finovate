
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface BudgetAlert {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
}

interface BudgetAlertsProps {
  alerts: BudgetAlert[];
}

const BudgetAlerts: React.FC<BudgetAlertsProps> = ({ alerts }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'danger':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas de Presupuesto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(alert.status)}
                <span className="font-medium">{alert.category}</span>
              </div>
              <Badge className={getStatusColor(alert.status)}>
                {alert.percentage}%
              </Badge>
            </div>
            
            <Progress 
              value={Math.min(alert.percentage, 100)} 
              className="h-2"
            />
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Gastado: {formatCurrency(alert.spentAmount)}</span>
              <span>Presupuesto: {formatCurrency(alert.budgetAmount)}</span>
            </div>
            
            {alert.status === 'danger' && (
              <p className="text-xs text-red-600 font-medium">
                ¡Has excedido el presupuesto para esta categoría!
              </p>
            )}
            {alert.status === 'warning' && (
              <p className="text-xs text-yellow-600 font-medium">
                Te estás acercando al límite del presupuesto.
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BudgetAlerts;
