
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
  Sun
} from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState('datos-personales');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('es');

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

  const renderContent = () => {
    switch (activeSection) {
      case 'datos-personales':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  U
                </div>
                <Button size="icon" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{userData.name}</h3>
                <p className="text-muted-foreground">Miembro desde {userData.joinDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input id="name" defaultValue={userData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" defaultValue={userData.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" defaultValue={userData.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue={userData.address} />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full md:w-auto">
              Guardar cambios
            </Button>
          </div>
        );

      case 'seguridad':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Cambiar contraseña
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña actual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva contraseña</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button onClick={handleSave}>Actualizar contraseña</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar estadísticas</p>
                    <p className="text-sm text-muted-foreground">Compartir estadísticas financieras básicas</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'apariencia':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <div>
                      <p className="font-medium">Modo oscuro</p>
                      <p className="text-sm text-muted-foreground">Cambia la apariencia de la aplicación</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalización</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Color de acento</Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-600" />
                    <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer border-2 border-transparent hover:border-green-600" />
                    <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer border-2 border-transparent hover:border-purple-600" />
                    <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer border-2 border-transparent hover:border-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'idioma':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Idioma de la aplicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Seleccionar idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
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
                <Button onClick={handleSave}>Aplicar cambios</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Región</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Formato de moneda</Label>
                  <Select defaultValue="eur">
                    <SelectTrigger>
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
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Centro de ayuda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Preguntas frecuentes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Contactar soporte
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Guía de usuario
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de la aplicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Versión:</span> 1.0.0</p>
                  <p><span className="font-medium">Última actualización:</span> 15 de Enero, 2024</p>
                  <p><span className="font-medium">Estado:</span> <Badge variant="secondary">Activo</Badge></p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'configuracion':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificaciones push</p>
                    <p className="text-sm text-muted-foreground">Recibe alertas sobre transacciones</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recordatorios de presupuesto</p>
                    <p className="text-sm text-muted-foreground">Alertas cuando superes límites</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resumen semanal</p>
                    <p className="text-sm text-muted-foreground">Recibe un resumen por email</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Datos y privacidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Exportar mis datos
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
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
      
      <div className="dashboard-layout">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información personal y configuraciones</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Menú lateral */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
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

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const activeItem = menuItems.find(item => item.id === activeSection);
                    const IconComponent = activeItem?.icon;
                    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
                  })()}
                  {menuItems.find(item => item.id === activeSection)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
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
