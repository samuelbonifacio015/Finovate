
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FinancialGoal } from '@/types/goals';
import { formatCurrency } from '@/utils/formatters';
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle 
} from 'lucide-react';
import { toast } from 'sonner';

interface GoalCardProps {
  goal: FinancialGoal;
  onAddContribution: (goalId: string, amount: number, note?: string) => void;
  onEdit: (goal: FinancialGoal) => void;
  onDelete: (goalId: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onAddContribution, onEdit, onDelete }) => {
  const [isContributionDialogOpen, setIsContributionDialogOpen] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [contributionNote, setContributionNote] = useState('');

  const progressPercentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const daysRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'emergency-fund': '🛡️',
      'vacation': '✈️',
      'debt-payment': '💳',
      'home-purchase': '🏠',
      'education': '📚',
      'retirement': '🏖️',
      'investment': '📈',
      'other': '🎯'
    };
    return icons[category] || '🎯';
  };

  const handleAddContribution = () => {
    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Por favor ingresa una cantidad válida');
      return;
    }

    onAddContribution(goal.id, amount, contributionNote);
    setContributionAmount('');
    setContributionNote('');
    setIsContributionDialogOpen(false);
    toast.success('Contribución añadida exitosamente');
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta meta?')) {
      onDelete(goal.id);
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
            <div>
              <CardTitle className="text-lg">{goal.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getPriorityColor(goal.priority)}>
              {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Media' : 'Baja'}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(goal.status)}`} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{formatCurrency(goal.currentAmount)}</span>
            <span className="text-muted-foreground">{formatCurrency(goal.targetAmount)}</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(progressPercentage)}% completado
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{formatCurrency(remainingAmount)}</p>
              <p className="text-muted-foreground">Restante</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{daysRemaining} días</p>
              <p className="text-muted-foreground">Restantes</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {goal.status !== 'completed' && (
            <Dialog open={isContributionDialogOpen} onOpenChange={setIsContributionDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-1" />
                  Contribuir
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Añadir Contribución</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Cantidad ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="note">Nota (opcional)</Label>
                    <Textarea
                      id="note"
                      value={contributionNote}
                      onChange={(e) => setContributionNote(e.target.value)}
                      placeholder="Agregar una nota..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddContribution} className="flex-1">
                      Añadir Contribución
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsContributionDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {goal.status === 'completed' && (
            <Button size="sm" disabled className="flex-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completada
            </Button>
          )}

          <Button size="sm" variant="outline" onClick={() => onEdit(goal)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
