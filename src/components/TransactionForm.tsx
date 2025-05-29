import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionFormData } from '@/types/finance';
import { generateCustomTransactionId } from '@/services/financeService';

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  isLoading?: boolean;
  initialType?: 'deposit' | 'withdrawal';
}

const CURRENCY_OPTIONS = [
  { value: 'EUR', label: 'Euros (€)' },
  { value: 'USD', label: 'Dólares ($)' },
  { value: 'PEN', label: 'Soles (S/)' },
];

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  isLoading = false,
  initialType = 'deposit',
}) => {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().slice(0, 5);
  const defaultCurrency = localStorage.getItem('finovate_currency') || 'EUR';
  
  const formSchema = z.object({
    customId: z.string().min(1, 'El ID es requerido'),
    type: z.enum(['deposit', 'withdrawal']),
    amount: z.coerce.number().positive('El monto debe ser mayor a 0'),
    description: z.string().min(3, 'La descripción debe tener al menos 3 caracteres'),
    date: z.string().min(1, 'La fecha es requerida'),
    time: z.string().min(1, 'La hora es requerida'),
    currency: z.string().min(1, 'La divisa es requerida'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customId: generateCustomTransactionId(),
      type: initialType,
      amount: 0,
      description: '',
      date: today,
      time: now,
      currency: defaultCurrency,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data as TransactionFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="deposit">Depósito</SelectItem>
                    <SelectItem value="withdrawal">Retiro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Divisa</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={defaultCurrency}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la divisa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CURRENCY_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                  placeholder="0.00" 
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

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Guardar Transacción'}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
