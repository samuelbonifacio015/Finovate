
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'financial-tip';
}

export interface FinancialContext {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsGoals: number;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
}

export interface ChatSuggestion {
  id: string;
  text: string;
  category: 'savings' | 'investment' | 'budget' | 'debt';
}
