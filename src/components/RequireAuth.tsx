
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  // En modo demostración, simulamos un usuario autenticado
  const demoUser = {
    id: "demo-user-1",
    name: "Usuario Demo",
    email: "usuario@ejemplo.com",
    role: "user",
    createdAt: new Date().toISOString()
  };

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Bypass la autenticación para la demostración
  useEffect(() => {
    // Si estuviéramos en producción, mantendríamos este código activo
    /*
    if (!loading && !user) {
      navigate('/login');
    }
    */
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <div className="animate-pulse text-center">
          <p className="text-lg font-satoshi font-medium text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
