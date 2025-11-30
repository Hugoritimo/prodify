import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityList, FilterTabs, WeekSummary } from '../../../components/screens/activity';
import { colors } from '../../../constants/theme';

const activities = [
  { id: '1', title: 'Tarefa concluida', description: 'Finalizar relatorio mensal', time: 'Ha 5 min', icon: 'checkmark-circle' as const, color: colors.success },
  { id: '2', title: 'Meta atingida', description: '7 dias consecutivos', time: 'Ha 2 horas', icon: 'trophy' as const, color: colors.warning },
  { id: '3', title: 'Nova conquista', description: 'Primeiro projeto completo', time: 'Ha 5 horas', icon: 'medal' as const, color: colors.accent.purple },
  { id: '4', title: 'Lembrete', description: 'Reuniao as 15h', time: 'Ontem', icon: 'alarm' as const, color: colors.info },
  { id: '5', title: 'Habito completado', description: 'Meditacao matinal', time: 'Ontem', icon: 'leaf' as const, color: colors.success },
];

const tabs = [
  { id: 'all', label: 'Todas' },
  { id: 'tasks', label: 'Tarefas' },
  { id: 'achievements', label: 'Conquistas' },
];

const weekStats = [
  { value: 24, label: 'Tarefas' },
  { value: 7, label: 'Conquistas' },
  { value: '85%', label: 'Progresso' },
];

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atividade</Text>
        <TouchableOpacity style={styles.markAllBtn}>
          <Ionicons name="checkmark-done" size={20} color={colors.primary} />
          <Text style={styles.markAllText}>Marcar lidas</Text>
        </TouchableOpacity>
      </View>

      <FilterTabs 
        tabs={tabs} 
        activeTabId={activeTab} 
        onTabPress={setActiveTab} 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ActivityList 
          title="Hoje" 
          activities={activities.slice(0, 2)} 
        />
        
        <ActivityList 
          title="Anteriores" 
          activities={activities.slice(2)} 
        />

        <WeekSummary stats={weekStats} />

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  markAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
