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

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
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

  // Mapeei os dados do banco para os seus componentes visuais
  const dynamicStats = [
    { 
      icon: 'checkmark-done' as const, 
      iconColor: colors.primary, 
      iconBackground: colors.transparent.primary, 
      value: 0, // Aqui vamos implementar as Tasks
      label: 'Tarefas' 
    },
    { 
      icon: 'flame' as const, 
      iconColor: colors.success, 
      iconBackground: colors.transparent.success, 
      value: userData?.streak || 0, // valor que vem do prisma
      label: 'Dias seguidos' 
    },
    { 
      icon: 'trophy' as const, 
      iconColor: colors.info, 
      iconBackground: colors.transparent.info, 
      value: userData?.points || 0, // adicionei 100 pontos iniciais, ja tava assim saporra kkkkk
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
        {/* tentei fazer um calculo de porcentagem, baseado nos ganhos, vamos melhorar isso dps */}
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