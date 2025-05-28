
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Para la demostración, siempre consideramos al usuario como autenticado
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/accounts') ||
                     location.pathname.includes('/profile') ||
                     location.pathname.includes('/goals') ||
                     location.pathname.includes('/transactions');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const NavigationLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <>
      <Link 
        to="/dashboard" 
        className={`hover:text-primary transition-colors text-base ${location.pathname === '/dashboard' ? 'text-primary font-medium' : 'text-gray-600'}`}
        onClick={onLinkClick}
      >
        Dashboard
      </Link>
      <Link 
        to="/transactions" 
        className={`hover:text-primary transition-colors text-base ${location.pathname === '/transactions' ? 'text-primary font-medium' : 'text-gray-600'}`}
        onClick={onLinkClick}
      >
        Transacciones
      </Link>
      <Link 
        to="/accounts/demo-account" 
        className={`hover:text-primary transition-colors text-base ${location.pathname.includes('/accounts') ? 'text-primary font-medium' : 'text-gray-600'}`}
        onClick={onLinkClick}
      >
        Cuenta Demo
      </Link>
      <Link 
        to="/goals" 
        className={`hover:text-primary transition-colors text-base ${location.pathname === '/goals' ? 'text-primary font-medium' : 'text-gray-600'}`}
        onClick={onLinkClick}
      >
        Metas
      </Link>
      <Link 
        to="/profile" 
        className={`hover:text-primary transition-colors text-base ${location.pathname === '/profile' ? 'text-primary font-medium' : 'text-gray-600'}`}
        onClick={onLinkClick}
      >
        Perfil
      </Link>
    </>
  );

  const AuthButtons = ({ onButtonClick }: { onButtonClick?: () => void }) => (
    <>
      {isDashboard ? (
        <>
          {!isMobile && (
            <span className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              Demo: Usuario
            </span>
          )}
          <Button 
            variant="outline"
            size="sm"
            onClick={() => {
              navigate('/');
              onButtonClick?.();
            }}
            className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
          >
            Volver al Inicio
          </Button>
        </>
      ) : (
        <>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              navigate('/login');
              onButtonClick?.();
            }}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Iniciar Sesión
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              navigate('/register');
              onButtonClick?.();
            }}
            className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
          >
            Registrarse
          </Button>
          <Button
            onClick={() => {
              navigate('/dashboard');
              onButtonClick?.();
            }}
          >
            Ver Demo
          </Button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {/* Mobile Menu - Now shows for all screen sizes up to lg */}
            {(isMobile || window.innerWidth <= 768) && isDashboard && (
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Navegación</DrawerTitle>
                    <DrawerDescription>
                      Accede a las diferentes secciones de la aplicación
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-6">
                    <nav className="flex flex-col space-y-4">
                      <DrawerClose asChild>
                        <div className="flex flex-col space-y-4">
                          <NavigationLinks onLinkClick={() => {}} />
                        </div>
                      </DrawerClose>
                    </nav>
                    {isDashboard && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <span className="inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-4">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          Demo: Usuario
                        </span>
                      </div>
                    )}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <div className="flex flex-col space-y-2">
                        <AuthButtons onButtonClick={() => {}} />
                      </div>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}

            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg p-2 text-lg font-bold">F</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                Finovate
              </span>
            </Link>
            
            {/* Desktop Navigation - Hidden on mobile and tablet */}
            {!isMobile && window.innerWidth > 768 && isDashboard && (
              <nav className="hidden lg:flex space-x-5">
                <NavigationLinks />
              </nav>
            )}
          </div>
          
          {/* Desktop Auth Buttons - Hidden on mobile */}
          {!isMobile && window.innerWidth > 768 && (
            <div className="hidden lg:flex items-center space-x-4">
              <AuthButtons />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
