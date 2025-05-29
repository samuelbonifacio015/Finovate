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
      content: '¡Hola! Soy tu asistente financiero personal. ¿En qué puedo ayudarte hoy? Puedo asesorarte sobre ahorro, inversiones, gastos, presupuestos y el uso de esta aplicación.',
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
    
    // Respuesta para saludo
    if (message.includes('hola') || message.includes('buenas') || message.includes('hi')) {
      return '¡Hola! Me alegra conocerte. Soy tu asistente financiero y estoy aquí para ayudarte a mejorar tu situación económica. ¿Te gustaría que hablemos sobre ahorro, inversiones, gastos inteligentes o cómo usar mejor esta aplicación?';
    }
    
    // Respuestas sobre consejos financieros generales
    if (message.includes('consejo') && message.includes('financiero')) {
      return 'Te doy estos consejos financieros esenciales: 1) Registra todos tus ingresos y gastos en esta aplicación, 2) Aplica la regla 50/30/20: 50% gastos necesarios, 30% gastos personales, 20% ahorros, 3) Crea un fondo de emergencia de 3-6 meses de gastos, 4) Revisa y ajusta tu presupuesto mensualmente usando las herramientas de la app.';
    }
    
    // Respuestas sobre en qué gastar dinero
    if (message.includes('gastar') && message.includes('dinero')) {
      return 'Para gastar inteligentemente tu dinero: 1) Prioriza necesidades básicas (vivienda, alimentación, salud), 2) Invierte en tu educación y desarrollo profesional, 3) Mantén un 30% para gastos personales y entretenimiento, 4) Usa la función de categorización en esta app para identificar patrones de gasto y optimizar tus decisiones.';
    }
    
    // Respuestas sobre gestión financiera
    if (message.includes('mejorar') && (message.includes('gestion') || message.includes('gestión') || message.includes('financiera'))) {
      return 'Para mejorar tu gestión financiera: 1) Usa esta aplicación para registrar cada transacción diariamente, 2) Revisa los reportes mensuales que genera la app, 3) Establece metas de ahorro específicas y monitoréalas, 4) Automatiza tus ahorros programando transferencias, 5) Analiza tus gráficos de gastos para identificar áreas de mejora.';
    }
    
    // Respuestas sobre cómo usar la aplicación
    if (message.includes('usar') && (message.includes('aplicacion') || message.includes('aplicación') || message.includes('app'))) {
      return 'Te explico cómo usar esta aplicación: 1) Ve al Dashboard para ver tu resumen financiero, 2) Usa "Cuentas" para gestionar tus diferentes cuentas bancarias, 3) Registra transacciones en tiempo real, 4) Revisa los gráficos y estadísticas para entender tus patrones, 5) Establece presupuestos y metas de ahorro. ¡Todo está diseñado para simplificar tu vida financiera!';
    }

    // Respuesta sobre inversiones
    if (message.includes('invertir') || message.includes('inversión') || message.includes('inversiones')) {
      return 'Invertir es una excelente forma de hacer crecer tu dinero a largo plazo. Te recomiendo diversificar tus inversiones, informarte sobre los diferentes instrumentos financieros y nunca invertir dinero que puedas necesitar a corto plazo. ¿Te gustaría saber más sobre fondos, acciones o inversiones seguras?';
    }

    //  Respuesta sobre deudas
    if (message.includes('deuda') || message.includes('deudas') || message.includes('pagar deuda')) {
      return 'Para gestionar tus deudas: 1) Prioriza pagar las deudas con mayor interés, 2) Intenta no adquirir nuevas deudas innecesarias, 3) Usa la app para registrar tus pagos y ver tu progreso, 4) Si es posible, consolida tus deudas para reducir intereses. ¿Quieres un plan personalizado para salir de deudas?';
    }
    
    // Respuesta general
    return 'Entiendo tu consulta. Como tu asistente financiero, te recomiendo: 1) Usar esta aplicación diariamente para registrar movimientos, 2) Revisar tus estadísticas semanalmente, 3) Establecer metas financieras claras. ¿Te gustaría que profundice en algún tema específico como ahorro, inversiones o el uso de la aplicación?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Verificar límite de mensajes (máximo 4 mensajes del usuario)
    const userMessages = messages.filter(msg => msg.sender === 'user');
    if (userMessages.length >= 4) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        content: 'Has excedido el límite de 4 mensajes. Si necesitas más ayuda, por favor recarga la página o vuelve a abrir el asistente.',
        sender: 'assistant',
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulación de tiempo de respuesta del asistente
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

  const userMessages = messages.filter(msg => msg.sender === 'user');
  const isMaxMessages = userMessages.length >= 4;

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-6 w-80 h-96 flex flex-col shadow-xl z-50 border border-gray-200 animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Bot 
            className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform duration-200" 
            onClick={onClose}
          />
          Asistente Financiero
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-white hover:bg-white/20 h-6 w-6 hover:scale-110 transition-all duration-200"
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
            
            {isMaxMessages && (
              <div className="flex justify-center">
                <div className="bg-yellow-100 text-yellow-800 p-2 rounded-lg text-xs text-center">
                  Has alcanzado el límite de 4 mensajes. ¡Espero haberte ayudado!
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
              placeholder={isMaxMessages ? "Límite de mensajes alcanzado" : "Escribe tu consulta..."}
              className="flex-1 text-xs h-8"
              disabled={isMaxMessages}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isMaxMessages} 
              size="sm" 
              className="h-8 hover:scale-105 transition-transform duration-200"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAssistant;
