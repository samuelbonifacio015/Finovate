
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import FinancialAssistant from './FinancialAssistant';

const ChatButton: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const toggleAssistant = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  return (
    <>
      <Button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-xl z-40 group"
        size="icon"
      >
        <Bot className="h-6 w-6 group-hover:animate-pulse" />
      </Button>

      <FinancialAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
    </>
  );
};

export default ChatButton;
