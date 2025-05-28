
import { User, UserRole } from '../types/finance';
import { toast } from 'sonner';

// Simulación de un sistema de autenticación
const STORAGE_KEY = 'finance_auth';

// Usuarios de ejemplo predefinidos
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'usuario@ejemplo.com',
    name: 'Usuario Normal',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@ejemplo.com',
    name: 'Administrador',
    role: 'user', 
    createdAt: new Date().toISOString(),
  },
];

interface AuthState {
  user: User | null;
  token: string | null;
}

export const getToken = (): string | null => {
  const auth = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as AuthState | null;
  return auth?.token || null;
};

export const getCurrentUser = (): User | null => {
  const auth = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as AuthState | null;
  return auth?.user || null;
};

export const login = (email: string, password: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    // Simulamos un delay de red
    setTimeout(() => {
      const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        // Generamos un token simulado
        const token = `token_${Math.random().toString(36).substring(2, 15)}`;
        
        // Guardamos en localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
        
        toast.success(`Bienvenido, ${user.name}!`);
        resolve({ user, token });
      } else {
        toast.error('Credenciales incorrectas');
        reject(new Error('Credenciales incorrectas'));
      }
    }, 800); // Simulamos latencia
  });
};

export const register = (email: string, name: string, password: string): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Verificar si el usuario ya existe
      const userExists = DEMO_USERS.some((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (userExists) {
        toast.error('El usuario ya existe');
        reject(new Error('El usuario ya existe'));
        return;
      }
      
      // Crear nuevo usuario (en una app real, esto sería manejado por el backend)
      const newUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name,
        role: 'user', // Los usuarios nuevos siempre son de tipo 'user'
        createdAt: new Date().toISOString(),
      };
      
      // Generamos token simulado
      const token = `token_${Math.random().toString(36).substring(2, 15)}`;
      
      // Guardamos en localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: newUser, token }));
      
      toast.success('Registro exitoso');
      resolve({ user: newUser, token });
    }, 800);
  });
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  toast.info('Sesión cerrada');
  window.location.href = '/';
};

export const isAdmin = (): boolean => {
  return false; 
};
