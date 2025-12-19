import React, { createContext, useState, useContext } from 'react';

// Definimos o que o nosso contexto vai compartilhar
interface AuthContextData {
  signed: boolean;
  user: { username: string } | null;
  signIn: (username: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Função chamada após o sucesso no cadastro/login
  function signIn(username: string) {
    setUser({ username });
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nas telas
export function useAuth() {
  return useContext(AuthContext);
}