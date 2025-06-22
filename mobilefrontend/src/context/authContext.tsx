import React, {
      createContext, useState, useEffect, useCallback,
} from 'react';
import { jwtDecode } from "jwt-decode";
import { User } from '../types/types';
import { getToken, saveToken, removeToken } from '../utils/storage';

interface AuthContextType {
      user: User | null;
      setUser: (user: User | null) => void;
      login: (token: string) => Promise<void>;
      logout: () => Promise<void>;
      isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
      user: null,
      setUser: () => { },
      login: async () => { },
      logout: async () => { },
      isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);
      const [isAuthenticated, setIsAuthenticated] = useState(false);


      const login = useCallback(async (token: string) => {
            try {
                  const decoded: User = jwtDecode(token);
                  await saveToken(token);
                  setUser(decoded);
                  setIsAuthenticated(true);
            } catch (error) {
                  console.error('Token decoding failed:', error);
                  await removeToken();
                  setUser(null);
                  setIsAuthenticated(false);
                  throw new Error('Invalid token');
            }
      }, []);

      const logout = useCallback(async () => {
            await removeToken();
            setUser(null);
            setIsAuthenticated(false);
      }, []);

      useEffect(() => {
            const loadUser = async () => {
                  try {
                        const token = await getToken();
                        if (token) {
                              await login(token);
                        }
                  } catch (error) {
                        console.error('Failed to load user:', error);
                  }
            };
            loadUser();
      }, [login]);

      return (
            <AuthContext.Provider
                  value={{
                        user,
                        setUser,
                        login,
                        logout,
                        isAuthenticated,
                  }}
            >
                  {children}
            </AuthContext.Provider>
      );
};
