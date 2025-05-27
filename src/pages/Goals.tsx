
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import GoalCard from '@/components/GoalCard';
import GoalForm from '@/components/GoalForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FinancialGoal, GoalFormData } from '@/types/goals';
import { 
  getGoals, 
  createGoal, 
  updateGoal, 
  deleteGoal, 
  addContribution, 
  initializeGoalsData 
} from '@/services/goalsService';
import { formatCurrency } from '@/utils/formatters';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  Pause
} from 'lucide-react';
import { toast } from 'sonner';

const Goals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FinancialGoal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Cargar metas
  const loadGoals = () => {
    const userGoals = getGoals();
    setGoals(userGoals);
  };
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    initializeGoalsData();
    loadGoals();
  }, [user, navigate]);

  const handleCreateGoal = async (data: GoalFormData) => {
    setIsLoading(true);
    try {
      createGoal(data);
      setIsDialogOpen(false);
      loadGoals();
      toast.success('Meta creada exitosamente');
    } catch (error) {
      console.error('Error al crear meta:', error);
      toast.error('Error al crear la meta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGoal = async (data: GoalFormData) => {
    if (!editingGoal) return;
    
    setIsLoading(true);
    try {
      updateGoal(editingGoal.id, data);
      setIsDialogOpen(false);
      setEditingGoal(null);
      loadGoals();
      toast.success('Meta actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar meta:', error);
      toast.error('Error al actualizar la meta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    try {
      deleteGoal(goalId);
      loadGoals();
      toast.success('Meta eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar meta:', error);
      toast.error('Error al eliminar la meta');
    }
  };

  const handleAddContribution = (goalId: string, amount: number, note?: string) => {
    try {
      addContribution(goalId, amount, note);
      loadGoals();
    } catch (error) {
      console.error('Error al añadir contribución:', error);
      toast.error('Error al añadir la contribución');
    }
  };

  const handleEditGoal = (goal: FinancialGoal) => {
    setEditingGoal(goal);
    setIsDialogOpen(true);
  };

  const handleNewGoal = () => {
    setEditingGoal(null);
    setIsDialogOpen(true);
  };

  // Filtrar metas según la pestaña activa
  const filteredGoals = goals.filter(goal => {
    switch (activeTab) {
      case 'active': return goal.status === 'active';
      case 'completed': return goal.status === 'completed';
      case 'paused': return goal.status === 'paused';
      default: return true;
    }
  });

  // Calcular estadísticas
  const totalGoals = goals.length;
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-finance-primary">Metas Financieras</h1>
              <p className="text-muted-foreground">
                Crea y gestiona tus objetivos financieros para alcanzar tus sueños
              </p>
            </div>
            
            <Button onClick={handleNewGoal}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Meta
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalGoals}</p>
                    <p className="text-sm text-gray-600">Total Metas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedGoals}</p>
                    <p className="text-sm text-gray-600">Completadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeGoals}</p>
                    <p className="text-sm text-gray-600">Activas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
                    <p className="text-sm text-gray-600">Progreso General</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pestañas y contenido */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">
                Todas ({totalGoals})
              </TabsTrigger>
              <TabsTrigger value="active">
                Activas ({activeGoals})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completadas ({completedGoals})
              </TabsTrigger>
              <TabsTrigger value="paused">
                Pausadas ({goals.filter(g => g.status === 'paused').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredGoals.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {activeTab === 'all' ? 'No tienes metas aún' : `No tienes metas ${activeTab === 'active' ? 'activas' : activeTab === 'completed' ? 'completadas' : 'pausadas'}`}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Comienza creando tu primera meta financiera
                    </p>
                    <Button onClick={handleNewGoal}>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Mi Primera Meta
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGoals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onAddContribution={handleAddContribution}
                      onEdit={handleEditGoal}
                      onDelete={handleDeleteGoal}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Diálogo para crear/editar meta */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingGoal ? 'Editar Meta' : 'Crear Nueva Meta'}
            </DialogTitle>
            <DialogDescription>
              {editingGoal 
                ? 'Modifica los detalles de tu meta financiera.'
                : 'Define un nuevo objetivo financiero para alcanzar tus sueños.'}
            </DialogDescription>
          </DialogHeader>
          
          <GoalForm
            onSubmit={editingGoal ? handleUpdateGoal : handleCreateGoal}
            isLoading={isLoading}
            initialData={editingGoal ? {
              title: editingGoal.title,
              description: editingGoal.description,
              targetAmount: editingGoal.targetAmount,
              deadline: editingGoal.deadline,
              category: editingGoal.category,
              priority: editingGoal.priority
            } : undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Goals;
