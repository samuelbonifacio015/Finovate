import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import SavingsGamification from '@/components/SavingsGamification';
import ChatButton from '@/components/ChatButton';
import { 
  BarChart,
  LineChart,
  PieChart,
  Trophy,
  PiggyBank,
  Wallet,
  Calendar,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Shield,
  LayoutDashboard,
  Settings,
  HelpCircle,
  MessageSquare,
  Users,
  FileText,
  CreditCard,
  Coins,
  Award,
  Zap
} from 'lucide-react';

const Index = () => {
  const [isDemo, setIsDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Toma el Control de tus Finanzas Personales
          </h1>
          <p className="text-xl mb-8">
            Planifica, ahorra e invierte con nuestra plataforma intuitiva y
            herramientas poderosas.
          </p>
          <Button size="lg">Comienza Ahora</Button>
        </div>
      </section>

      {/* Gamificación del Ahorro */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Alcanza tus Metas de Ahorro con Diversión
        </h2>
        <SavingsGamification />
      </section>

      {/* Educación Financiera Personalizada */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">
            Educación Financiera Personalizada
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Aprende a invertir, ahorrar y administrar tu dinero con nuestros
            cursos y guías diseñados para ti.
          </p>
          <Button variant="secondary">Explorar Cursos</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="mx-auto mb-4">
              <BarChart className="h-10 w-10 text-blue-500 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Análisis de Gastos</h3>
            <p className="text-gray-600">
              Visualiza tus gastos y descubre dónde puedes ahorrar.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="mx-auto mb-4">
              <TrendingUp className="h-10 w-10 text-green-500 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Seguimiento de Inversiones
            </h3>
            <p className="text-gray-600">
              Monitorea tus inversiones y maximiza tus ganancias.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="mx-auto mb-4">
              <Shield className="h-10 w-10 text-yellow-500 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Planificación Segura
            </h3>
            <p className="text-gray-600">
              Planifica tu futuro financiero con herramientas seguras y
              confiables.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          ¿Listo para Transformar tus Finanzas?
        </h2>
        <p className="text-xl mb-8">
          Únete a nuestra comunidad y comienza a construir un futuro financiero
          sólido.
        </p>
        <Button variant="secondary" size="lg">
          Regístrate Gratis
        </Button>
      </section>

      {/* Asistente Virtual Financiero - Botón Flotante */}
      <ChatButton />
    </div>
  );
};

export default Index;
