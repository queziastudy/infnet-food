import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../data/user';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem('@user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Erro ao carregar usuário:', error);
      } finally {
        setLoadingAuth(false);
      }
    }

    loadUser();
  }, []);

  //email: joao@gmail.com | senha: 123
  async function login(email, password) {
    if (email === USER.email && password == USER.password) {
      try {
        setUser(USER);

        await AsyncStorage.setItem('@user', JSON.stringify(USER));

        return true;
      } catch (error) {
        console.log('Erro ao fazer login:', error);
        return false;
      }
    }

    return false;
  }

  async function logout() {
    try {
      setUser(null);
      await AsyncStorage.removeItem('@user');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loadingAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
