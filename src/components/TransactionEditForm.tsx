
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Transaction } from '@/types/finance';
import { updateTransaction } from '@/services/financeService';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TransactionEditFormProps {
  transaction: Transaction;
  onSuccess: () => void;
  onCancel: () => void;
}

const TransactionEditForm: React.FC<TransactionEditFormProps> = ({
  transaction,
  onSuccess,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    customId: z.string().min(1, 'El ID es requerido'),
    description: z.string().min(3, 'La descripción debe tener al menos 3 caracteres'),
    amount: z.coerce.number().positive('El monto debe ser mayor a 0'),
    date: z.string().min(1, 'La fecha es requerida'),
    time: z.string().min(1, 'La hora es requerida'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customId: transaction.customId,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      time: transaction.time,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await updateTransaction(transaction.id, {
        customId: data.customId,
        description: data.description,
        amount: data.amount,
        date: data.date,
        time: data.time,
      });
      onSuccess();
    } catch (error) {
      console.error("Error al actualizar la transacción:", error);
      toast.error("No se pudo actualizar la transacción");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de Transacción</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading} />
              </FormControl>
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
                  placeholder="Descripción de la transacción" 
                  {...field} 
                  disabled={isLoading}
                />
              </FormControl>
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
                  placeholder="0.00" 
                  {...field} 
                  disabled={isLoading || transaction.type === 'transfer'}
                />
              </FormControl>
              {transaction.type === 'transfer' && (
                <p className="text-xs text-amber-600">
                  El monto no se puede editar en transferencias.
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input 
                    type="time" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionEditForm;
