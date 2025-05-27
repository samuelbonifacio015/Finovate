
import { FinancialGoal, GoalContribution, GoalFormData } from '@/types/goals';

const GOALS_STORAGE_KEY = 'financial_goals';
const CONTRIBUTIONS_STORAGE_KEY = 'goal_contributions';

// Datos de ejemplo
const exampleGoals: FinancialGoal[] = [
  {
    id: '1',
    userId: 'demo-user',
    title: 'Fondo de Emergencia',
    description: 'Ahorrar 6 meses de gastos para emergencias',
    targetAmount: 18000,
    currentAmount: 12500,
    deadline: '2024-12-31',
    category: 'emergency-fund',
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    userId: 'demo-user',
    title: 'Vacaciones de Verano',
    description: 'Viaje familiar a Europa por 2 semanas',
    targetAmount: 8000,
    currentAmount: 3200,
    deadline: '2024-06-15',
    category: 'vacation',
    priority: 'medium',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    userId: 'demo-user',
    title: 'Pagar Tarjeta de Crédito',
    description: 'Liquidar deuda de tarjeta de crédito',
    targetAmount: 5000,
    currentAmount: 2000,
    deadline: '2024-08-31',
    category: 'debt-payment',
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

export const initializeGoalsData = (): void => {
  const existingGoals = localStorage.getItem(GOALS_STORAGE_KEY);
  const existingContributions = localStorage.getItem(CONTRIBUTIONS_STORAGE_KEY);
  
  if (!existingGoals) {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(exampleGoals));
  }
  
  if (!existingContributions) {
    localStorage.setItem(CONTRIBUTIONS_STORAGE_KEY, JSON.stringify([]));
  }
};

export const getGoals = (): FinancialGoal[] => {
  const goals = localStorage.getItem(GOALS_STORAGE_KEY);
  return goals ? JSON.parse(goals) : [];
};

export const getGoalById = (id: string): FinancialGoal | null => {
  const goals = getGoals();
  return goals.find(goal => goal.id === id) || null;
};

export const createGoal = (goalData: GoalFormData): FinancialGoal => {
  const goals = getGoals();
  const newGoal: FinancialGoal = {
    id: Date.now().toString(),
    userId: 'demo-user',
    ...goalData,
    currentAmount: 0,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  goals.push(newGoal);
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  return newGoal;
};

export const updateGoal = (id: string, updates: Partial<FinancialGoal>): FinancialGoal | null => {
  const goals = getGoals();
  const goalIndex = goals.findIndex(goal => goal.id === id);
  
  if (goalIndex === -1) return null;
  
  goals[goalIndex] = {
    ...goals[goalIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  return goals[goalIndex];
};

export const deleteGoal = (id: string): boolean => {
  const goals = getGoals();
  const filteredGoals = goals.filter(goal => goal.id !== id);
  
  if (filteredGoals.length === goals.length) return false;
  
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(filteredGoals));
  return true;
};

export const addContribution = (goalId: string, amount: number, note?: string): boolean => {
  const goals = getGoals();
  const goalIndex = goals.findIndex(goal => goal.id === goalId);
  
  if (goalIndex === -1) return false;
  
  goals[goalIndex].currentAmount += amount;
  goals[goalIndex].updatedAt = new Date().toISOString();
  
  // Check if goal is completed
  if (goals[goalIndex].currentAmount >= goals[goalIndex].targetAmount) {
    goals[goalIndex].status = 'completed';
  }
  
  localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  
  // Add contribution record
  const contributions = getContributions();
  const newContribution: GoalContribution = {
    id: Date.now().toString(),
    goalId,
    amount,
    date: new Date().toISOString(),
    note
  };
  
  contributions.push(newContribution);
  localStorage.setItem(CONTRIBUTIONS_STORAGE_KEY, JSON.stringify(contributions));
  
  return true;
};

export const getContributions = (): GoalContribution[] => {
  const contributions = localStorage.getItem(CONTRIBUTIONS_STORAGE_KEY);
  return contributions ? JSON.parse(contributions) : [];
};

export const getContributionsByGoal = (goalId: string): GoalContribution[] => {
  const contributions = getContributions();
  return contributions.filter(contribution => contribution.goalId === goalId);
};
