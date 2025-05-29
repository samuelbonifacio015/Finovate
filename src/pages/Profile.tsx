
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import ChatButton from '@/components/ChatButton';
import { 
  User, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle, 
  Settings,
  Edit,
  Camera,
  Lock,
  Eye,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState('datos-personales');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('es');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Datos simulados del usuario
  const userData = {
    name: 'Usuario Demo',
    email: 'usuario@ejemplo.com',
    phone: '+34 600 123 456',
    address: 'Calle Ejemplo 123, Madrid, España',
    joinDate: '15 de Enero, 2024'
  };

  const handleSave = () => {
    toast.success('Configuración guardada correctamente');
  };

  const menuItems = [
    { id: 'datos-personales', label: 'Datos Personales', icon: User },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
    { id: 'apariencia', label: 'Apariencia', icon: Palette },
    { id: 'idioma', label: 'Idioma', icon: Globe },
    { id: 'ayuda', label: 'Ayuda', icon: HelpCircle },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'datos-personales':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-6">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  U
                </div>
                <Button size="icon" className="absolute -bottom-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full">
                  <Camera className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold">{userData.name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">Miembro desde {userData.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Nombre completo</Label>
                <Input id="name" defaultValue={userData.name} className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Correo electrónico</Label>
                <Input id="email" type="email" defaultValue={userData.email} className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Teléfono</Label>
                <Input id="phone" defaultValue={userData.phone} className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm">Dirección</Label>
                <Input id="address" defaultValue={userData.address} className="text-sm" />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full sm:w-auto text-sm">
              Guardar cambios
            </Button>
          </div>
        );

      case 'seguridad':
        return (
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                  Cambiar contraseña
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-sm">Contraseña actual</Label>
                  <Input id="current-password" type="password" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm">Nueva contraseña</Label>
                  <Input id="new-password" type="password" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm">Confirmar nueva contraseña</Label>
                  <Input id="confirm-password" type="password" className="text-sm" />
                </div>
                <Button onClick={handleSave} className="w-full sm:w-auto text-sm">Actualizar contraseña</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">Perfil público</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <Switch className="shrink-0" />
                </div>
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">Mostrar estadísticas</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Compartir estadísticas financieras básicas</p>
                  </div>
                  <Switch className="shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'apariencia':
        return (
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Tema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    {darkMode ? <Moon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />}
                    <div>
                      <p className="font-medium text-sm sm:text-base">Modo oscuro</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Cambia la apariencia de la aplicación</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} className="shrink-0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Personalización</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Color de acento</Label>
                  <div className="flex gap-2 flex-wrap">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600" />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full cursor-pointer border-2 border-transparent hover:border-green-600" />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full cursor-pointer border-2 border-transparent hover:border-purple-600" />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full cursor-pointer border-2 border-transparent hover:border-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'idioma':
        return (
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Idioma de la aplicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm">Seleccionar idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSave} className="w-full sm:w-auto text-sm">Aplicar cambios</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Región</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Formato de moneda</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="gbp">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'ayuda':
        return (
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Centro de ayuda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 sm:space-y-3">
                  <Button variant="outline" className="w-full justify-start text-sm h-12 sm:h-10">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Preguntas frecuentes
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-12 sm:h-10">
                    <User className="h-4 w-4 mr-2" />
                    Contactar soporte
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm h-12 sm:h-10">
                    <Settings className="h-4 w-4 mr-2" />
                    Guía de usuario
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Información de la aplicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p><span className="font-medium">Versión:</span> 1.1.0</p>
                  <p><span className="font-medium">Última actualización:</span> 29 de Enero, 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'configuracion':
        return (
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">Notificaciones push</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Recibe alertas sobre transacciones</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} className="shrink-0" />
                </div>
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">Recordatorios de presupuesto</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Alertas cuando superes límites</p>
                  </div>
                  <Switch className="shrink-0" />
                </div>
                <div className="flex items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">Resumen semanal</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Recibe un resumen por email</p>
                  </div>
                  <Switch className="shrink-0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-lg sm:text-xl">Datos y privacidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm h-12 sm:h-10">
                  Exportar mis datos
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 text-sm h-12 sm:h-10">
                  Eliminar cuenta
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="dashboard-layout px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Gestiona tu información personal y configuraciones</p>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full justify-between text-sm h-12"
          >
            <span className="flex items-center gap-2">
              {(() => {
                const activeItem = menuItems.find(item => item.id === activeSection);
                const IconComponent = activeItem?.icon;
                return IconComponent ? <IconComponent className="h-4 w-4" /> : null;
              })()}
              {menuItems.find(item => item.id === activeSection)?.label}
            </span>
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-white h-full w-80 max-w-[85vw] shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Configuración</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-4 text-left text-sm transition-colors hover:bg-gray-100 rounded-lg ${
                      activeSection === item.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Configuración</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-100 ${
                        activeSection === item.id 
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <span className="hidden sm:flex items-center gap-2">
                    {(() => {
                      const activeItem = menuItems.find(item => item.id === activeSection);
                      const IconComponent = activeItem?.icon;
                      return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
                    })()}
                    {menuItems.find(item => item.id === activeSection)?.label}
                  </span>
                  <span className="sm:hidden">
                    {menuItems.find(item => item.id === activeSection)?.label}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChatButton />
    </div>
  );
};

export default Profile;
