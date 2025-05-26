import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot } from 'lucide-react';
import { Message } from '@/types/chat';

interface FinancialAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancialAssistant: React.FC<FinancialAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu asistente financiero personal. ¿En qué puedo ayudarte hoy? Puedo asesorarte sobre ahorro, inversiones, manejo de deudas, presupuestos y más.',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getFinancialAdvice = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Respuestas sobre ahorro
    if (message.includes('ahorr') || message.includes('guardar dinero')) {
      return 'Para ahorrar efectivamente, te recomiendo: 1) Establece una meta específica de ahorro mensual (idealmente 20% de tus ingresos), 2) Automatiza tus ahorros con transferencias programadas, 3) Usa la regla 50/30/20 (50% gastos necesarios, 30% gastos personales, 20% ahorros), 4) Considera abrir una cuenta de ahorros separada para evitar tentaciones.';
    }
    
    // Respuestas sobre inversiones
    if (message.includes('inver') || message.includes('acciones') || message.includes('bolsa')) {
      return 'Para comenzar a invertir: 1) Asegúrate de tener un fondo de emergencia primero, 2) Invierte solo dinero que no necesites en 3-5 años, 3) Diversifica tu cartera (no pongas todo en una sola inversión), 4) Considera fondos indexados para principiantes, 5) Invierte consistentemente cada mes (promedio de costo).';
    }
    
    // Respuestas sobre deudas
    if (message.includes('deuda') || message.includes('préstamo') || message.includes('tarjeta')) {
      return 'Para manejar deudas eficientemente: 1) Lista todas tus deudas con tasas de interés, 2) Paga el mínimo en todas y extra en la de mayor interés, 3) Considera consolidar deudas si tienes mejor tasa, 4) Evita crear nuevas deudas, 5) Negocia con acreedores si tienes dificultades.';
    }
    
    // Respuestas sobre presupuesto
    if (message.includes('presupuesto') || message.includes('gastos') || message.includes('dinero')) {
      return 'Para crear un presupuesto efectivo: 1) Registra todos tus ingresos y gastos por un mes, 2) Categoriza tus gastos (necesarios vs. opcionales), 3) Usa aplicaciones o hojas de cálculo para seguimiento, 4) Revisa y ajusta mensualmente, 5) Deja espacio para gastos inesperados.';
    }
    
    // Respuestas sobre fondo de emergencia
    if (message.includes('emergencia') || message.includes('imprevisto')) {
      return 'Un fondo de emergencia es crucial: 1) Ahorra 3-6 meses de gastos básicos, 2) Manténlo en una cuenta de fácil acceso pero separada, 3) Úsalo solo para verdaderas emergencias (pérdida de trabajo, gastos médicos), 4) Reponlo inmediatamente después de usarlo.';
    }
    
    // Respuesta general
    return 'Entiendo tu consulta. Algunas recomendaciones generales: 1) Mantén un registro detallado de tus finanzas, 2) Establece metas financieras claras y alcanzables, 3) Edúcate continuamente sobre finanzas personales, 4) Busca asesoría profesional para decisiones importantes. ¿Podrías ser más específico sobre tu situación para darte consejos más personalizados?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular tiempo de respuesta del asistente
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getFinancialAdvice(inputMessage),
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-6 w-80 h-96 flex flex-col shadow-xl z-50 border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Bot className="h-4 w-4" />
          Asistente Financiero
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-white hover:bg-white/20 h-6 w-6"
        >
          <X className="h-3 w-3" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2 rounded-lg text-xs ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu consulta..."
              className="flex-1 text-xs h-8"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} size="sm" className="h-8">
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAssistant;
