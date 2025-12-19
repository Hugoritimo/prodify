import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../src/services/api'; 
import { useAuth } from '../../src/contexts/AuthContext'; // Importando o contexto

export default function SignUp() {
  const router = useRouter();
  const { signIn } = useAuth(); // Função para "avisar" o app que logamos
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async () => {
    // Validação básica para evitar campos vazios
    if (!username || !email || !password) {
      return Alert.alert('Opa!', 'Preencha todos os campos para continuar! 🚀');
    }

    try {
      const response = await api.post('/auth/registro', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // 1. Avisa o Contexto que o usuário agora está "signed"
        signIn(response.data.username); 
        
        Alert.alert('Boa!', `Bem-vindo ao Prodify, ${response.data.username}!`);
        
        // 2. O RootLayout vai perceber a mudança no 'signed' e 
        // fará o redirecionamento automático para /(tabs)/home
      }
    } catch (error: any) {
      const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar.';
      console.log('Erro no front:', error.response?.data);
      Alert.alert('Erro', mensagemErro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bons estudos!</Text>
      <Text style={styles.subtitle}>Crie sua conta no Prodify</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

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
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Cadastrar e Entrar</Text>
      </TouchableOpacity>

      {/* Usamos replace para voltar ao início sem erro de navegação */}
     {/* Antes estava '/' ou 'router.back()', o que causava erro ou bumerangue */}
<TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
  <Text style={styles.link}>Já tenho conta, quero entrar</Text>
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