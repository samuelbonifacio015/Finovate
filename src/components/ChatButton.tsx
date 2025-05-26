
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import FinancialAssistant from './FinancialAssistant';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <FinancialAssistant 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        financialContext={{
          totalBalance: 15600,
          monthlyIncome: 3500,
          monthlyExpenses: 2800,
          savingsGoals: 18000,
          riskProfile: 'moderate'
        }}
      />
    </>
  );
};

export default ChatButton;
