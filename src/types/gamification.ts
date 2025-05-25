
export interface SavingsChallenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  duration: number; // días
  startDate: string;
  endDate: string;
  reward: number; // puntos
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'completed' | 'failed';
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: string;
  category: 'savings' | 'spending' | 'consistency' | 'milestone';
}

export interface UserStats {
  totalPoints: number;
  level: number;
  streak: number; // días consecutivos de ahorro
  totalSaved: number;
  completedChallenges: number;
  achievements: Achievement[];
}

export interface SavingsGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  icon: string;
}
