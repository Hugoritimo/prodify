import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../src/services/api'; 
import { useAuth } from '../../src/contexts/AuthContext';

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
      // Rota de login no seu backend NestJS
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        // 1. Salva o usuário no contexto (usando o username que o backend devolve)
        signIn(response.data.username); 
        
        Alert.alert('Sucesso', `Bem-vindo de volta, ${response.data.username}!`);
        
        // 2. O RootLayout detecta o 'signed' e te leva para /(tabs)/home
      }
    } catch (error: any) {
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
        <Text style={styles.buttonText}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
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
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  link: { 
    color: '#A8A8B3', 
    textAlign: 'center', 
    marginTop: 24, 
    textDecorationLine: 'underline' 
  },
});