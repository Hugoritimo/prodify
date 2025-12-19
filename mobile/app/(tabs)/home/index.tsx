import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { Header } from '../../../components';
import { ProductivityCard, RecentActivities, StatsGrid } from '../../../components/screens/home';
import { colors } from '../../../constants/theme';
import api from '../../../src/services/api';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  // Função para buscar dados do NestJS
  const loadHomeData = async () => {
    try {
      setLoading(true);
      // Por enquanto usamos o VictorG fixo, conforme o registro no banco
      const response = await api.get('/user/VictorG'); 
      setUserData(response.data);
    } catch (error) {
      console.error("Erro na API:", error);
      Alert.alert("Erro", "Não foi possível carregar seus dados do servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  // Enquanto os dados não chegam do Docker/Prisma
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  // Mapeamos os dados do banco para os seus componentes visuais
  const dynamicStats = [
    { 
      icon: 'checkmark-done' as const, 
      iconColor: colors.primary, 
      iconBackground: colors.transparent.primary, 
      value: 0, // Implementaremos Tasks em breve
      label: 'Tarefas' 
    },
    { 
      icon: 'flame' as const, 
      iconColor: colors.success, 
      iconBackground: colors.transparent.success, 
      value: userData?.streak || 0, // Valor vindo do Prisma
      label: 'Dias seguidos' 
    },
    { 
      icon: 'trophy' as const, 
      iconColor: colors.info, 
      iconBackground: colors.transparent.info, 
      value: userData?.points || 0, // Os 100 pontos iniciais
      label: 'XP Total' 
    },
  ];

  // Exemplo de atividades recentes (podemos buscar do banco depois)
  const recentActivities = [
    { 
      icon: 'person-add' as const, 
      iconColor: colors.primary, 
      iconBackground: colors.transparent.primary, 
      title: 'Conta criada', 
      time: 'Agora mesmo' 
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header 
        title={userData?.username || "Guerreiro"} 
        subtitle="Olá," 
        showNotification 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Usando a porcentagem baseada nos pontos iniciais */}
        <ProductivityCard percentage={userData?.points ? 85 : 0} period="Meta atual" />
        
        <StatsGrid stats={dynamicStats} />
        
        <RecentActivities 
          activities={recentActivities} 
          onSeeAll={() => {}} 
        />

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});