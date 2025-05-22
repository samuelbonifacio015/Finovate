
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Para la demostración, siempre consideramos al usuario como autenticado
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/accounts') ||
                     location.pathname.includes('/admin');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg p-2 text-lg font-bold">F</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                FinanzApp
              </span>
            </Link>
            
            {isDashboard && (
              <nav className="hidden md:flex space-x-5">
                <Link to="/dashboard" className={`hover:text-primary transition-colors text-base ${location.pathname === '/dashboard' ? 'text-primary font-medium' : 'text-gray-600'}`}>
                  Dashboard
                </Link>
                <Link to="/accounts/demo-account" className={`hover:text-primary transition-colors text-base ${location.pathname.includes('/accounts') ? 'text-primary font-medium' : 'text-gray-600'}`}>
                  Cuenta Demo
                </Link>
                <Link to="/admin" className={`hover:text-primary transition-colors text-base ${location.pathname === '/admin' ? 'text-primary font-medium' : 'text-gray-600'}`}>
                  Admin
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {isDashboard ? (
              <>
                <span className="hidden md:inline-flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  Demo: Usuario
                </span>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/')}
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
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900"
                >
                  Registrarse
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                >
                  Ver Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
