// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api'; // Importe sua api aqui

interface User {
  id?: string;
  username: string;
  // adicione outros campos se precisar
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS AO ABRIR O APP
  useEffect(() => {
    async function loadStorageData() {
      try {
        // Busca token e usuário salvos no celular
        const [storedUser, storedToken] = await AsyncStorage.multiGet([
          '@Prodify:user',
          '@Prodify:token'
        ]);

        if (storedUser[1] && storedToken[1]) {
          // Se achou, configura a API imediatamente
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken[1]}`;
          setUser(JSON.parse(storedUser[1]));
        }
      } catch (error) {
        console.log("Erro ao carregar storage", error);
      } finally {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // 2. FUNÇÃO DE LOGIN (Agora recebe o TOKEN)
  async function signIn(token: string, userData: User) {
    try {
      // Configura o Axios para as próximas requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Salva no estado
      setUser(userData);

      // Salva no armazenamento do celular (Persistência)
      await AsyncStorage.multiSet([
        ['@Prodify:token', token],
        ['@Prodify:user', JSON.stringify(userData)],
      ]);
    } catch (error) {
      console.log("Erro ao salvar login", error);
    }
  }

  // 3. FUNÇÃO DE LOGOUT
  async function signOut() {
    try {
      await AsyncStorage.multiRemove(['@Prodify:user', '@Prodify:token']);
      setUser(null);
      // Remove o token do Axios
      delete api.defaults.headers.common['Authorization'];
    } catch {
      // erro silencioso
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}