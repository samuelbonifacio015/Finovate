
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Account } from '@/types/finance';
import { formatCurrency } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';

interface AccountCardProps {
  account: Account;
  onEdit?: () => void;
  onDelete?: () => void;
}

// Función para obtener el icono según el tipo de cuenta
const getAccountIcon = (type: Account['type']) => {
  switch (type) {
    case 'checking':
      return '💳';
    case 'savings':
      return '🏦';
    case 'investment':
      return '📈';
    case 'credit':
      return '💰';
    default:
      return '💵';
  }
};

// Función para obtener el nombre amigable del tipo de cuenta
const getAccountTypeName = (type: Account['type']) => {
  switch (type) {
    case 'checking':
      return 'Cuenta Corriente';
    case 'savings':
      return 'Cuenta de Ahorros';
    case 'investment':
      return 'Inversión';
    case 'credit':
      return 'Crédito';
    default:
      return 'Cuenta';
  }
};

const AccountCard: React.FC<AccountCardProps> = ({ account, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card className="account-card animate-fade-in h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-2xl mb-1">{getAccountIcon(account.type)}</div>
            <h3 className="font-semibold text-lg">{account.name}</h3>
            <p className="text-sm text-muted-foreground">{getAccountTypeName(account.type)}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-xl">{formatCurrency(account.balance, account.currency)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Actualizado: {new Date(account.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(`/accounts/${account.id}`)}
        >
          Ver Detalles
        </Button>

        <div className="flex gap-2">
          {onEdit && (
            <Button 
              variant="outline"
              size="sm"
              onClick={onEdit}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button 
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              Eliminar
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
