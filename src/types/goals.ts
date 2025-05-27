
export interface FinancialGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: GoalCategory;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export type GoalCategory = 
  | 'emergency-fund'
  | 'vacation'
  | 'debt-payment'
  | 'home-purchase'
  | 'education'
  | 'retirement'
  | 'investment'
  | 'other';

export interface GoalContribution {
  id: string;
  goalId: string;
  amount: number;
  date: string;
  note?: string;
}

export interface GoalFormData {
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
  category: GoalCategory;
  priority: 'low' | 'medium' | 'high';
}
