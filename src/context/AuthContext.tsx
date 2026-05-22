import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import {
  loginCliente,
  registerCliente,
  logoutCliente,
  type LoginData,
  type RegisterData,
  type AuthResponse,
} from '../services/api';
import { getCookie, setCookie, eraseCookie } from '../utils/cookies';

interface User {
  id?: number;
  name?: string;
  nombres?: string;
  apellidos?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = getCookie('access_token');
    const savedUser = getCookie('user');
    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error('Failed to parse user from cookies', e);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const persistSession = (res: AuthResponse) => {
    setCookie('access_token', res.access_token, 7);
    if (res.user) {
      setCookie('user', JSON.stringify(res.user), 7);
    }
    setToken(res.access_token);
    setUser(res.user ?? null);
  };

  const login = async (data: LoginData) => {
    const res = await loginCliente(data);
    persistSession(res);
  };

  const register = async (data: RegisterData) => {
    const res = await registerCliente(data);
    persistSession(res);
  };

  const logout = () => {
    logoutCliente();
    eraseCookie('access_token');
    eraseCookie('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
