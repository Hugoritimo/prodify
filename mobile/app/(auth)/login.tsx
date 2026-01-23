import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../src/services/api'; 
import { useAuth } from '../../src/contexts/AuthContext';
import { colors } from '../../constants/theme'; // Opcional: Se quiser usar seu tema

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Atenção', 'Preencha todos os campos! 🚀');
    }

    try {
      setLoading(true);

      // 1. Faz o POST para o NestJS
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // 2. Extrai o Token e os Dados do Usuário da resposta
      // O seu backend deve retornar: { access_token: "...", username: "...", id: "..." }
      const { access_token, username, id } = response.data;

      if (!access_token) {
        throw new Error("Token não fornecido pelo servidor.");
      }

      // 3. Chama a nova função signIn passando o TOKEN e o OBJETO USUÁRIO
      await signIn(access_token, { 
        username: username, 
        id: id // Se o backend mandar ID, salvamos também
      });
      
      // O redirecionamento acontece automaticamente pelo RootLayout ou:
      // router.replace('/(tabs)/home');

    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || 'E-mail ou senha incorretos.';
      Alert.alert('Erro no Login', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Que bom te ver!</Text>
      <Text style={styles.subtitle}>Faça login para continuar sua jornada</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
             <ActivityIndicator color="#FFF" />
        ) : (
             <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se agora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#121214' 
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#A8A8B3', marginBottom: 32 },
  input: {
    backgroundColor: '#202024',
    color: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00B37E', 
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  link: { 
    color: '#A8A8B3', 
    textAlign: 'center', 
    marginTop: 24, 
    textDecorationLine: 'underline' 
  },
});