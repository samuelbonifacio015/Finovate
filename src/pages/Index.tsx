
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gradient-to-b from-finance-light to-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-finance-primary mb-6">
                Gestión simple y eficaz para tus finanzas personales
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Administra tus cuentas, realiza transferencias y mantén el control de tus finanzas en un solo lugar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-finance-primary hover:bg-finance-primary/90 text-white px-6 py-2"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="outline"
                  className="border-finance-primary text-finance-primary hover:bg-finance-primary hover:text-white"
                  onClick={() => navigate('/register')}
                >
                  Crear Cuenta
                </Button>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                <p>
                  Credenciales de demo:
                </p>
                <p>
                  Usuario: usuario@ejemplo.com
                </p>
                <p>
                  Administrador: admin@ejemplo.com
                </p>
                <p>
                  Cualquier contraseña funciona con estos usuarios.
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-xl text-finance-primary">Mi Dashboard</h3>
                    <p className="text-sm text-gray-500">Vista previa</p>
                  </div>
                  <div className="text-finance-accent font-semibold">$17,500.00</div>
                </div>
                
                <div className="space-y-4">
                  {/* Tarjeta de ejemplo */}
                  <div className="bg-finance-light p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-xl mb-1">💳</div>
                        <div className="font-medium">Cuenta Corriente</div>
                        <div className="text-xs text-gray-500">Última actualización: Hoy</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">$2,500.00</div>
                        <div className="text-xs text-finance-accent mt-1">+$500 este mes</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-finance-light p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-xl mb-1">🏦</div>
                        <div className="font-medium">Cuenta de Ahorros</div>
                        <div className="text-xs text-gray-500">Última actualización: Ayer</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">$15,000.00</div>
                        <div className="text-xs text-finance-accent mt-1">+$1,500 este mes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="stat-card">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-lg">Seguro y Privado</h3>
              <p className="text-gray-600">Tus datos financieros están protegidos con la más alta seguridad.</p>
            </div>
            
            <div className="stat-card">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-lg">Información Completa</h3>
              <p className="text-gray-600">Visualiza tus gastos, ingresos y saldo de forma clara y organizada.</p>
            </div>
            
            <div className="stat-card">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-lg">Acceso desde Cualquier Dispositivo</h3>
              <p className="text-gray-600">Gestiona tus finanzas desde tu computadora, tablet o teléfono móvil.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-finance-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">© 2023 FinanzApp</p>
            <p className="text-sm text-gray-300">Una aplicación de gestión financiera personal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
