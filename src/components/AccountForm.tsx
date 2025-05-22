
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Account, AccountType } from '@/types/finance';
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

const formSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  type: z.enum(['checking', 'savings', 'investment', 'credit'] as const),
  balance: z.coerce.number().min(0, { message: 'El balance debe ser un número positivo' }),
  currency: z.string().min(1, { message: 'Selecciona una moneda' }),
});

type FormData = z.infer<typeof formSchema>;

interface AccountFormProps {
  initialData?: Partial<Account>;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({
  initialData = {},
  onSubmit,
  isLoading = false,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || '',
      type: (initialData.type as AccountType) || 'checking',
      balance: initialData.balance || 0,
      currency: initialData.currency || 'USD',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la cuenta</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ej: Mi Cuenta Corriente" />
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
              <FormLabel>Tipo de Cuenta</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo de cuenta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="checking">Cuenta Corriente</SelectItem>
                  <SelectItem value="savings">Cuenta de Ahorros</SelectItem>
                  <SelectItem value="investment">Inversión</SelectItem>
                  <SelectItem value="credit">Crédito</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saldo Inicial</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moneda</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una moneda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USD">USD (Dólar Americano)</SelectItem>
                  <SelectItem value="PEN">PEN (Sol Peruano)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Guardando...' : initialData.id ? 'Actualizar Cuenta' : 'Crear Cuenta'}
        </Button>
      </form>
    </Form>
  );
};

export default AccountForm;
