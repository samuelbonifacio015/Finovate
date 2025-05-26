
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  userProfile?: 'ahorrador' | 'inversor' | 'deudor';
}

export interface FinancialAdvice {
  category: 'ahorro' | 'inversion' | 'deuda' | 'presupuesto' | 'general';
  advice: string;
  tips?: string[];
}
