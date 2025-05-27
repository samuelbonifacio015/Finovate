
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoalFormData, GoalCategory } from '@/types/goals';

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<GoalFormData>;
}

const goalCategories: { value: GoalCategory; label: string; icon: string }[] = [
  { value: 'emergency-fund', label: 'Fondo de Emergencia', icon: '🛡️' },
  { value: 'vacation', label: 'Vacaciones', icon: '✈️' },
  { value: 'debt-payment', label: 'Pago de Deuda', icon: '💳' },
  { value: 'home-purchase', label: 'Compra de Casa', icon: '🏠' },
  { value: 'education', label: 'Educación', icon: '📚' },
  { value: 'retirement', label: 'Jubilación', icon: '🏖️' },
  { value: 'investment', label: 'Inversión', icon: '📈' },
  { value: 'other', label: 'Otro', icon: '🎯' }
];

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, isLoading = false, initialData }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<GoalFormData>({
    defaultValues: initialData
  });

  const selectedCategory = watch('category');

  const handleFormSubmit = (data: GoalFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="title">Título de la meta</Label>
          <Input
            id="title"
            {...register('title', { required: 'El título es obligatorio' })}
            placeholder="Ej: Fondo de emergencia"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Describe tu objetivo financiero..."
            className="min-h-[80px]"
          />
        </div>

        <div>
          <Label htmlFor="targetAmount">Cantidad objetivo ($)</Label>
          <Input
            id="targetAmount"
            type="number"
            step="0.01"
            min="0"
            {...register('targetAmount', { 
              required: 'La cantidad objetivo es obligatoria',
              min: { value: 1, message: 'La cantidad debe ser mayor a 0' }
            })}
            placeholder="0.00"
          />
          {errors.targetAmount && (
            <p className="text-sm text-red-600 mt-1">{errors.targetAmount.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="deadline">Fecha límite</Label>
          <Input
            id="deadline"
            type="date"
            {...register('deadline', { required: 'La fecha límite es obligatoria' })}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.deadline && (
            <p className="text-sm text-red-600 mt-1">{errors.deadline.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select onValueChange={(value) => setValue('category', value as GoalCategory)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría">
                {selectedCategory && (
                  <div className="flex items-center gap-2">
                    <span>{goalCategories.find(cat => cat.value === selectedCategory)?.icon}</span>
                    <span>{goalCategories.find(cat => cat.value === selectedCategory)?.label}</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {goalCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">La categoría es obligatoria</p>
          )}
        </div>

        <div>
          <Label htmlFor="priority">Prioridad</Label>
          <Select onValueChange={(value) => setValue('priority', value as 'low' | 'medium' | 'high')}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona la prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">🔴 Alta</SelectItem>
              <SelectItem value="medium">🟡 Media</SelectItem>
              <SelectItem value="low">🟢 Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Guardando...' : 'Crear Meta'}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;
