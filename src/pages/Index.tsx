
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Navigation from '@/components/Navigation';
import { ArrowRight, CreditCard, BarChart, Wallet, BookOpen, PiggyBank, Coins, Calculator } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [userProfile] = useState('ahorrador'); // Simulación de perfil: 'ahorrador', 'inversor', 'deudor'

  // Contenido educativo personalizado basado en el perfil del usuario
  const educationalContent = {
    ahorrador: [
      {
        title: "Estrategias de ahorro efectivas",
        description: "Aprende a crear un fondo de emergencia y establecer metas de ahorro realistas.",
        icon: <PiggyBank className="h-10 w-10 text-blue-500" />,
        type: "article"
      },
      {
        title: "Presupuesto inteligente",
        description: "Técnicas para hacer seguimiento de tus gastos y maximizar tu capacidad de ahorro.",
        icon: <Calculator className="h-10 w-10 text-green-500" />,
        type: "video"
      },
      {
        title: "Automatiza tus ahorros",
        description: "Configura transferencias automáticas para cumplir tus objetivos financieros sin esfuerzo.",
        icon: <Wallet className="h-10 w-10 text-purple-500" />,
        type: "tips"
      }
    ],
    inversor: [
      {
        title: "Fundamentos de inversión",
        description: "Conceptos básicos para comenzar tu camino como inversor.",
        icon: <BarChart className="h-10 w-10 text-blue-500" />,
        type: "article"
      },
      {
        title: "Diversificación de cartera",
        description: "Estrategias para distribuir tus inversiones y minimizar riesgos.",
        icon: <Coins className="h-10 w-10 text-green-500" />,
        type: "video"
      },
      {
        title: "Inversiones a largo plazo",
        description: "Cómo construir riqueza consistente con un enfoque paciente.",
        icon: <PiggyBank className="h-10 w-10 text-purple-500" />,
        type: "tips"
      }
    ],
    deudor: [
      {
        title: "Plan para eliminar deudas",
        description: "Métodos probados para reducir tus deudas de manera sistemática.",
        icon: <CreditCard className="h-10 w-10 text-blue-500" />,
        type: "article"
      },
      {
        title: "Refinanciamiento inteligente",
        description: "Cuándo y cómo refinanciar préstamos para ahorrar en intereses.",
        icon: <Calculator className="h-10 w-10 text-green-500" />,
        type: "video"
      },
      {
        title: "Mejora tu puntaje crediticio",
        description: "Acciones concretas para mejorar tu historial crediticio.",
        icon: <BarChart className="h-10 w-10 text-purple-500" />,
        type: "tips"
      }
    ]
  };

  // Seleccionar contenido basado en el perfil del usuario
  const personalizedContent = educationalContent[userProfile] || educationalContent.ahorrador;

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

        {/* Educación Financiera Personalizada */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Educación Financiera Personalizada
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Contenido adaptado a tu perfil financiero para ayudarte a tomar mejores decisiones con tu dinero.
              </p>
            </div>

            <Tabs defaultValue="article" className="w-full max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 w-[400px]">
                  <TabsTrigger value="article">Artículos</TabsTrigger>
                  <TabsTrigger value="video">Videos</TabsTrigger>
                  <TabsTrigger value="tips">Consejos</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="article" className="mt-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {personalizedContent.filter(item => item.type === "article").map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="h-full">
                          <CardHeader>
                            <div className="flex justify-center mb-4">
                              {item.icon}
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full" variant="outline">Leer más</Button>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))}
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <Card className="h-full border border-dashed border-gray-300 bg-gray-50/50">
                        <CardHeader>
                          <div className="flex justify-center mb-4">
                            <BookOpen className="h-10 w-10 text-gray-400" />
                          </div>
                          <CardTitle className="text-gray-500">Más artículos</CardTitle>
                          <CardDescription>Descubre nuestra biblioteca completa de recursos financieros.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button className="w-full">Ver biblioteca</Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex justify-center mt-8">
                    <CarouselPrevious className="static translate-y-0 mr-2" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                </Carousel>
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {personalizedContent.filter(item => item.type === "video").map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="h-full">
                          <CardHeader>
                            <div className="flex justify-center mb-4">
                              {item.icon}
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full" variant="outline">Ver video</Button>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))}
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <Card className="h-full border border-dashed border-gray-300 bg-gray-50/50">
                        <CardHeader>
                          <div className="flex justify-center mb-4">
                            <BookOpen className="h-10 w-10 text-gray-400" />
                          </div>
                          <CardTitle className="text-gray-500">Más videos</CardTitle>
                          <CardDescription>Explora nuestra colección completa de videos educativos.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button className="w-full">Ver colección</Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex justify-center mt-8">
                    <CarouselPrevious className="static translate-y-0 mr-2" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                </Carousel>
              </TabsContent>

              <TabsContent value="tips" className="mt-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {personalizedContent.filter(item => item.type === "tips").map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="h-full">
                          <CardHeader>
                            <div className="flex justify-center mb-4">
                              {item.icon}
                            </div>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full" variant="outline">Ver consejos</Button>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    ))}
                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <Card className="h-full border border-dashed border-gray-300 bg-gray-50/50">
                        <CardHeader>
                          <div className="flex justify-center mb-4">
                            <BookOpen className="h-10 w-10 text-gray-400" />
                          </div>
                          <CardTitle className="text-gray-500">Más consejos</CardTitle>
                          <CardDescription>Accede a todos nuestros consejos prácticos para mejorar tus finanzas.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button className="w-full">Ver todos</Button>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex justify-center mt-8">
                    <CarouselPrevious className="static translate-y-0 mr-2" />
                    <CarouselNext className="static translate-y-0" />
                  </div>
                </Carousel>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">¿Quieres recibir contenido personalizado en tu correo?</p>
              <Button 
                size="lg"
                className="gap-2 text-base"
              >
                Suscríbete a nuestro boletín <ArrowRight className="h-4 w-4" />
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
