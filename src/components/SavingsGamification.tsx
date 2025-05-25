
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Target, 
  Star, 
  Flame, 
  Gift, 
  TrendingUp, 
  Calendar,
  Coins,
  Award,
  Zap
} from 'lucide-react';
import { SavingsChallenge, Achievement, UserStats, SavingsGoal } from '@/types/gamification';

const SavingsGamification = () => {
  const [userStats] = useState<UserStats>({
    totalPoints: 2850,
    level: 7,
    streak: 12,
    totalSaved: 15600,
    completedChallenges: 8,
    achievements: []
  });

  const [activeChallenges] = useState<SavingsChallenge[]>([
    {
      id: '1',
      title: 'Desafío 30 Días',
      description: 'Ahorra $50 diarios durante 30 días',
      targetAmount: 1500,
      currentAmount: 650,
      duration: 30,
      startDate: '2024-01-01',
      endDate: '2024-01-30',
      reward: 500,
      difficulty: 'medium',
      status: 'active',
      icon: 'calendar'
    },
    {
      id: '2',
      title: 'Sin Gastos Innecesarios',
      description: 'Evita compras impulsivas por 7 días',
      targetAmount: 0,
      currentAmount: 0,
      duration: 7,
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      reward: 200,
      difficulty: 'easy',
      status: 'active',
      icon: 'target'
    }
  ]);

  const [savingsGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      title: 'Fondo de Emergencia',
      description: 'Ahorra 6 meses de gastos',
      targetAmount: 18000,
      currentAmount: 12500,
      deadline: '2024-12-31',
      priority: 'high',
      category: 'emergencia',
      icon: 'shield'
    },
    {
      id: '2',
      title: 'Vacaciones de Verano',
      description: 'Viaje a la playa en familia',
      targetAmount: 5000,
      currentAmount: 2800,
      deadline: '2024-06-15',
      priority: 'medium',
      category: 'entretenimiento',
      icon: 'sun'
    }
  ]);

  const [recentAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Ahorrador Constante',
      description: 'Ahorra por 10 días consecutivos',
      icon: 'flame',
      points: 100,
      unlockedAt: '2024-01-10',
      category: 'consistency'
    },
    {
      id: '2',
      title: 'Meta Alcanzada',
      description: 'Completa tu primer objetivo de ahorro',
      icon: 'target',
      points: 250,
      unlockedAt: '2024-01-08',
      category: 'milestone'
    },
    {
      id: '3',
      title: 'Primer Millón',
      description: 'Alcanza $1,000 en ahorros',
      icon: 'coins',
      points: 500,
      unlockedAt: '2024-01-05',
      category: 'milestone'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-8">
      {/* Panel de Estadísticas del Usuario */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Puntos Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">Nivel {userStats.level}</p>
                <p className="text-sm text-gray-600">Rango Actual</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.streak}</p>
                <p className="text-sm text-gray-600">Días de Racha</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Coins className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${userStats.totalSaved.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Ahorrado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="challenges" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges">Desafíos</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
        </TabsList>

        {/* Desafíos Activos */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Desafíos Activos</h3>
            <Button size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Nuevo Desafío
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {challenge.targetAmount > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>${challenge.currentAmount.toLocaleString()}</span>
                        <span>${challenge.targetAmount.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(challenge.currentAmount, challenge.targetAmount)} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{challenge.duration} días</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{challenge.reward} pts</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    Ver Progreso
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Metas de Ahorro */}
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Metas de Ahorro</h3>
            <Button size="sm">
              <Target className="h-4 w-4 mr-2" />
              Nueva Meta
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingsGoals.map((goal) => (
              <Card key={goal.id} className={`border-l-4 ${getPriorityColor(goal.priority)}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>${goal.currentAmount.toLocaleString()}</span>
                      <span>${goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={getProgressPercentage(goal.currentAmount, goal.targetAmount)} 
                      className="h-3"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(getProgressPercentage(goal.currentAmount, goal.targetAmount))}% completado
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{goal.deadline}</span>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {goal.priority}
                    </Badge>
                  </div>
                  
                  <Button className="w-full" size="sm" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Aumentar Ahorro
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Logros */}
        <TabsContent value="achievements" className="space-y-4">
          <h3 className="text-lg font-semibold">Logros Recientes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAchievements.map((achievement) => (
              <Card key={achievement.id} className="text-center">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <Badge variant="secondary">+{achievement.points} puntos</Badge>
                  </div>
                  {achievement.unlockedAt && (
                    <p className="text-xs text-gray-500">
                      Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline">
              Ver Todos los Logros
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavingsGamification;
