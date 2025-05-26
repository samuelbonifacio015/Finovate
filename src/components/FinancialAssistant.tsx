
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  PiggyBank, 
  CreditCard,
  Target,
  X
} from 'lucide-react';
import { ChatMessage, FinancialContext, ChatSuggestion } from '@/types/chat';

interface FinancialAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  financialContext?: FinancialContext;
}

const FinancialAssistant: React.FC<FinancialAssistantProps> = ({ 
  isOpen, 
  onClose, 
  financialContext 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu asistente financiero personal. Estoy aquí para ayudarte con consejos de ahorro, inversión, presupuesto y gestión de deudas. ¿En qué puedo ayudarte hoy?',
      role: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const suggestions: ChatSuggestion[] = [
    { id: '1', text: '¿Cómo puedo ahorrar más dinero?', category: 'savings' },
    { id: '2', text: '¿Dónde debería invertir?', category: 'investment' },
    { id: '3', text: 'Ayúdame con mi presupuesto', category: 'budget' },
    { id: '4', text: '¿Cómo pagar mis deudas?', category: 'debt' }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ahorr')) {
      return `Excelente pregunta sobre ahorro. Basándome en tu perfil financiero, te recomiendo:
      
1. **Regla 50-30-20**: Destina 50% a gastos necesarios, 30% a gastos personales y 20% al ahorro.
2. **Automatización**: Configura transferencias automáticas a tu cuenta de ahorros.
3. **Meta mensual**: Intenta ahorrar al menos $500 mensuales para crear un fondo de emergencia.
4. **Revisa gastos**: Identifica gastos innecesarios como suscripciones no utilizadas.

¿Te gustaría que profundice en alguno de estos puntos?`;
    }
    
    if (message.includes('invers')) {
      return `Para inversiones, considerando tu perfil, te sugiero:
      
1. **Diversificación**: No pongas todos los huevos en una canasta.
2. **Fondos indexados**: Ideales para principiantes con bajo riesgo.
3. **Plazo fijo**: Para inversiones conservadoras a corto plazo.
4. **Criptomonedas**: Solo un pequeño porcentaje si tienes tolerancia al riesgo.

Recuerda: nunca inviertas dinero que no puedes permitirte perder. ¿Cuál es tu horizonte de inversión?`;
    }
    
    if (message.includes('presupuesto') || message.includes('budget')) {
      return `Te ayudo a organizar tu presupuesto:
      
1. **Registra ingresos**: Anota todos tus ingresos mensuales.
2. **Lista gastos fijos**: Renta, servicios, seguros, préstamos.
3. **Gastos variables**: Comida, transporte, entretenimiento.
4. **Categoriza**: Usa nuestra función de categorías automáticas.
5. **Revisa mensualmente**: Ajusta según tus patrones de gasto.

¿Quieres que analice alguna categoría específica de gastos?`;
    }
    
    if (message.includes('deuda')) {
      return `Para gestionar deudas efectivamente:
      
1. **Lista todas las deudas**: Saldo, tasa de interés, pago mínimo.
2. **Método avalancha**: Paga primero las de mayor interés.
3. **Método bola de nieve**: Paga primero las de menor saldo.
4. **Evita nuevas deudas**: No uses tarjetas para gastos innecesarios.
5. **Considera consolidación**: Si tienes múltiples deudas.

¿Cuál es tu situación de deuda actual? Puedo ayudarte a crear un plan específico.`;
    }
    
    return `Entiendo tu consulta. Como tu asistente financiero, puedo ayudarte con:

• **Estrategias de ahorro** personalizadas
• **Consejos de inversión** según tu perfil de riesgo
• **Planificación de presupuesto** detallada
• **Gestión de deudas** y pagos

¿Podrías ser más específico sobre qué aspecto financiero te interesa más? Así podré darte consejos más precisos.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular tiempo de respuesta del asistente
    setTimeout(() => {
      const assistantResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage),
        role: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const getSuggestionIcon = (category: string) => {
    switch (category) {
      case 'savings': return <PiggyBank className="h-4 w-4" />;
      case 'investment': return <TrendingUp className="h-4 w-4" />;
      case 'budget': return <Target className="h-4 w-4" />;
      case 'debt': return <CreditCard className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bot className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle>Asistente Financiero</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Área de mensajes */}
          <ScrollArea className="flex-1 h-[400px]" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="bg-blue-100 p-1 rounded-full h-8 w-8 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="bg-gray-200 p-1 rounded-full h-8 w-8 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="bg-blue-100 p-1 rounded-full h-8 w-8 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sugerencias rápidas */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Preguntas frecuentes:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Badge
                  key={suggestion.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 flex items-center gap-1"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  {getSuggestionIcon(suggestion.category)}
                  {suggestion.text}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input de mensaje */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta financiera..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAssistant;
