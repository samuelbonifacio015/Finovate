
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Gestión de Cuentas",
      description: "Administra múltiples cuentas bancarias, de ahorro e inversión en un solo lugar.",
      icon: "💰"
    },
    {
      title: "Registro de Transacciones",
      description: "Registra y categoriza ingresos, gastos y transferencias fácilmente.",
      icon: "📊"
    },
    {
      title: "Seguimiento de Gastos",
      description: "Visualiza de dónde viene y adónde va tu dinero con gráficos claros.",
      icon: "📈"
    },
    {
      title: "Notificaciones",
      description: "Recibe alertas sobre movimientos importantes en tus cuentas.",
      icon: "🔔"
    }
  ];

  const testimonials = [
    {
      content: "FinanzApp me ha ayudado a organizar mis finanzas como nunca antes. Ahora puedo ver claramente mis gastos e ingresos.",
      author: "Carlos R.",
      role: "Emprendedor"
    },
    {
      content: "Increíble herramienta para mantener todas mis cuentas en orden. La interfaz es muy intuitiva y fácil de usar.",
      author: "María L.",
      role: "Profesional independiente"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Administra tus finanzas con facilidad
            </h1>
            <p className="text-xl mb-8 opacity-90">
              FinanzApp te ayuda a controlar tu dinero, gestionar tus cuentas y alcanzar tus objetivos financieros.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/dashboard')}
              >
                Probar Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
                onClick={() => navigate('/register')}
              >
                Crear Cuenta
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-xs opacity-70">Balance Total</p>
                    <p className="text-2xl font-bold">$12,580.50</p>
                  </div>
                  <div className="bg-white/20 h-12 w-12 flex items-center justify-center rounded-full">
                    <span className="text-2xl">💳</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Cuenta Corriente</p>
                        <p className="text-xs opacity-70">•••• 4832</p>
                      </div>
                      <p className="font-semibold">$3,240.50</p>
                    </div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Ahorros</p>
                        <p className="text-xs opacity-70">•••• 7281</p>
                      </div>
                      <p className="font-semibold">$9,340.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Características */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Todo lo que necesitas para gestionar tus finanzas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              FinanzApp ofrece herramientas poderosas y fáciles de usar para ayudarte a tomar el control de tu vida financiera.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Lo que dicen nuestros usuarios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Miles de personas ya han tomado control de sus finanzas con FinanzApp.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md bg-white">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sección CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Comienza a organizar tus finanzas hoy</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Únete a miles de usuarios que han mejorado su salud financiera con FinanzApp
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => navigate('/register')}
            >
              Crear Cuenta Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              onClick={() => navigate('/dashboard')}
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg p-2 text-lg font-bold">F</div>
                <span className="text-xl font-bold text-white">
                  FinanzApp
                </span>
              </div>
              <p className="mt-2 text-gray-400 max-w-md">
                La aplicación que te ayuda a controlar tus finanzas personales de manera sencilla y efectiva.
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} FinanzApp. Todos los derechos reservados.
              </p>
              <div className="mt-2 flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
