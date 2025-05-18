
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (adminOnly && user.role !== 'admin') {
        navigate('/dashboard');
      }
    }
  }, [user, loading, adminOnly, navigate]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null; // El useEffect redirigirá
  }

  if (adminOnly && user.role !== 'admin') {
    return null; // El useEffect redirigirá
  }

  return <>{children}</>;
};

export default RequireAuth;
