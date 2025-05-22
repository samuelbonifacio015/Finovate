
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { ArrowRight, CreditCard, BarChart, Wallet } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-finance-light to-white py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="w-full md:w-1/2 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold text-finance-primary mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                    Finanzas simples
                  </span> para tu día a día
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
                  Administra tus cuentas, realiza transferencias y mantén el control de tus finanzas en un solo lugar.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg"
                    className="gap-2 text-base"
                    onClick={() => navigate('/dashboard')}
                  >
                    Ver Demostración <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Preview Dashboard Card */}
              <div className="w-full md:w-1/2 max-w-xl">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up">
                  <div className="bg-gradient-cool p-6 text-white">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-xl">Mi Dashboard</h3>
                      <span className="text-lg font-bold">$17,540.00</span>
                    </div>
                    <p className="text-white/80 text-sm">Saldo total en todas tus cuentas</p>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow transition-all">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Cuenta Corriente</p>
                            <p className="text-xs text-gray-500">Última actualización: Hoy</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">$2,540.00</p>
                          <p className="text-xs text-green-600">+$500 este mes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow transition-all">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                            <Wallet className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Ahorros</p>
                            <p className="text-xs text-gray-500">Última actualización: Ayer</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">$15,000.00</p>
                          <p className="text-xs text-green-600">+$1,500 este mes</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate('/dashboard')}
                    >
                      Ver Todas las Cuentas
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Tu dinero bajo control
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Wallet className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Múltiples Cuentas</h3>
                <p className="text-gray-600">Gestiona todas tus cuentas bancarias desde un único lugar de forma sencilla.</p>
              </div>
              
              <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <CreditCard className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Transferencias Fáciles</h3>
                <p className="text-gray-600">Mueve dinero entre tus cuentas con seguridad y rapidez en pocos clics.</p>
              </div>
              
              <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
                  <BarChart className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Analítica Detallada</h3>
                <p className="text-gray-600">Visualiza tus finanzas con gráficos y estadísticas de fácil interpretación.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="gap-2 text-base"
              >
                Explorar la Demostración <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-finance-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-medium mb-2">© 2023 FinanzApp</p>
            <p className="text-sm text-gray-300">Una aplicación de gestión financiera personal</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
