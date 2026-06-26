import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { initializeDatabase, loginUser, registerUser, loginWithCode as dbLoginWithCode } from '../lib/database';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithCode: (code: string) => Promise<{ success: boolean; message: string }>;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, password: string, inviteCode: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('初始化数据库失败:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const loginWithCode = async (code: string) => {
    const result = dbLoginWithCode(code);
    
    if (result.success) {
      const user = { id: result.userId, username: result.username };
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    return { success: result.success, message: result.message };
  };

  const login = async (username: string, password: string) => {
    const result = loginUser(username, password);
    
    if (result.success) {
      const user = { id: result.userId, username };
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    
    return { success: result.success, message: result.message };
  };

  const register = async (username: string, password: string, inviteCode: string) => {
    const result = registerUser(username, password, inviteCode);
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithCode, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
