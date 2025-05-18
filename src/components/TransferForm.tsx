
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Account } from '@/types/finance';
import { formatCurrency } from '@/utils/formatters';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TransferFormProps {
  accounts: Account[];
  fromAccountId?: string;
  onSubmit: (data: TransferData) => void;
  isLoading?: boolean;
}

interface TransferData {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description: string;
}

const TransferForm: React.FC<TransferFormProps> = ({
  accounts,
  fromAccountId,
  onSubmit,
  isLoading = false,
}) => {
  const [selectedFromAccount, setSelectedFromAccount] = useState<Account | undefined>(
    fromAccountId ? accounts.find((acc) => acc.id === fromAccountId) : undefined
  );

  const formSchema = z.object({
    fromAccountId: z.string().min(1, { message: 'Selecciona la cuenta de origen' }),
    toAccountId: z.string().min(1, { message: 'Selecciona la cuenta de destino' }),
    amount: z.coerce.number()
      .min(0.01, { message: 'El monto debe ser mayor a 0' })
      .refine(
        (val) => !selectedFromAccount || val <= (selectedFromAccount?.balance || 0),
        { message: 'Saldo insuficiente en la cuenta de origen' }
      ),
    description: z.string().min(3, { message: 'La descripción debe tener al menos 3 caracteres' }),
  }).refine((data) => data.fromAccountId !== data.toAccountId, {
    message: 'Las cuentas de origen y destino deben ser diferentes',
    path: ['toAccountId'],
  });

  const form = useForm<TransferData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAccountId: fromAccountId || '',
      toAccountId: '',
      amount: 0,
      description: '',
    },
  });

  const watchFromAccountId = form.watch('fromAccountId');
  
  // Actualizar la cuenta seleccionada cuando cambia el ID
  React.useEffect(() => {
    const fromAccount = accounts.find((acc) => acc.id === watchFromAccountId);
    setSelectedFromAccount(fromAccount);
  }, [watchFromAccountId, accounts]);

  const handleSubmit = (data: TransferData) => {
    if (data.fromAccountId === data.toAccountId) {
      toast.error('No puedes transferir a la misma cuenta');
      return;
    }

    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fromAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta de Origen</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const account = accounts.find((acc) => acc.id === value);
                  setSelectedFromAccount(account);
                }}
                defaultValue={field.value}
                disabled={!!fromAccountId || isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la cuenta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} ({formatCurrency(account.balance, account.currency)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toAccountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta de Destino</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la cuenta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts
                    .filter((account) => account.id !== watchFromAccountId)
                    .map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} ({formatCurrency(account.balance, account.currency)})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  {...field}
                  disabled={isLoading}
                  placeholder="0.00"
                />
              </FormControl>
              {selectedFromAccount && (
                <p className="text-xs text-muted-foreground">
                  Saldo disponible: {formatCurrency(selectedFromAccount.balance, selectedFromAccount.currency)}
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
                  {...field}
                  disabled={isLoading}
                  placeholder="Ej: Transferencia para gastos"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Realizar Transferencia'}
        </Button>
      </form>
    </Form>
  );
};

export default TransferForm;
