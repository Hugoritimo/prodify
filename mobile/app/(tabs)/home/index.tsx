import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../../components';
import { ProductivityCard, RecentActivities, StatsGrid } from '../../../components/screens/home';
import { colors } from '../../../constants/theme';

const stats = [
  { icon: 'checkmark-done' as const, iconColor: colors.primary, iconBackground: colors.transparent.primary, value: 24, label: 'Tarefas' },
  { icon: 'flame' as const, iconColor: colors.success, iconBackground: colors.transparent.success, value: 7, label: 'Dias seguidos' },
  { icon: 'time' as const, iconColor: colors.info, iconBackground: colors.transparent.info, value: '12h', label: 'Focado' },
];

const recentActivities = [
  { icon: 'document-text' as const, iconColor: colors.primary, iconBackground: colors.transparent.primary, title: 'Projeto concluido', time: 'Ha 2 horas' },
  { icon: 'trophy' as const, iconColor: colors.success, iconBackground: colors.transparent.success, title: 'Meta atingida', time: 'Ha 5 horas' },
  { icon: 'star' as const, iconColor: colors.warning, iconBackground: colors.transparent.warning, title: 'Nova conquista', time: 'Ontem' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header 
        title="Usuario" 
        subtitle="Ola," 
        showNotification 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProductivityCard percentage={85} period="Esta semana" />
        
        <StatsGrid stats={stats} />
        
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
  },
});
