
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-finance-primary text-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">FinanzApp</Link>
            
            {user && (
              <nav className="hidden md:flex space-x-4">
                <Link to="/dashboard" className="hover:text-finance-accent transition-colors">
                  Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-finance-accent transition-colors">
                    Admin
                  </Link>
                )}
              </nav>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:inline text-sm">
                  {user.role === 'admin' ? '👑 ' : ''}{user.name}
                </span>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white border-white hover:bg-white hover:text-finance-primary"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-white hover:bg-white/10"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="text-white border-white hover:bg-white hover:text-finance-primary"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
