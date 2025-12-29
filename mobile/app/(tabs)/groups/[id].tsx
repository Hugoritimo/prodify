import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, Alert, FlatList 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing } from '../../../constants/theme';

// MOCK DE MEMBROS (Fixo para teste visual)
const MOCK_MEMBERS = [
  { id: '1', name: 'Você', xp: 1250, hours: 32, avatar: null, rank: 1 },
  { id: '2', name: 'Ana Clara', xp: 1020, hours: 28, avatar: null, rank: 2 },
  { id: '3', name: 'João Paulo', xp: 980, hours: 25, avatar: null, rank: 3 },
];

// MOCK DO PLANO DE ESTUDOS
const MOCK_STUDY_PLAN = [
  { id: '1', title: 'Leitura: Cap. 1 a 3', type: 'READING', points: 50, done: true },
  { id: '2', title: 'Resolver Lista de Exercícios', type: 'EXERCISE', points: 100, done: false },
  { id: '3', title: 'Revisão de Flashcards', type: 'REVIEW', points: 30, done: false },
  { id: '4', title: 'Simulado Semanal', type: 'TEST', points: 200, done: false },
];

export default function GroupDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'plan'>('overview');

  const groupData = {
    name: params.name || 'Nome do Grupo',
    description: params.description || 'Sem descrição.',
    image: (params.image as string) || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
    membersCount: params.membersCount || 1,
    weeklyGoal: Number(params.weeklyGoal) || 100,
    currentHours: Number(params.currentHours) || 0,
  };

  const progress = Math.min((groupData.currentHours / groupData.weeklyGoal) * 100, 100);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.navigate('/(tabs)/groups');
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'overview') {
      return (
        <View style={styles.tabContent}>
           <Text style={styles.description}>{groupData.description}</Text>

          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>Meta Coletiva</Text>
              <Text style={styles.statsValue}>{progress.toFixed(0)}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <View style={styles.statsFooter}>
              <Text style={styles.statsFooterText}>{groupData.currentHours}h acumuladas</Text>
              <Text style={styles.statsFooterText}>Meta: {groupData.weeklyGoal}h</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ranking do Squad 👑</Text>
          </View>
          {MOCK_MEMBERS.map((member, index) => (
            <View key={member.id} style={styles.memberRow}>
              <Text style={[styles.memberRank, index < 3 && { color: '#FFD700', fontWeight: 'bold' }]}>#{member.rank}</Text>
              <View style={styles.avatar}><Text style={styles.avatarText}>{member.name.charAt(0)}</Text></View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberXp}>{member.xp} XP</Text>
              </View>
              <Text style={styles.hoursText}>{member.hours}h</Text>
            </View>
          ))}
        </View>
      );
    } 
    
    return (
      <View style={styles.tabContent}>
        <Text style={styles.planDescription}>
          Tarefas completadas aqui somam pontos para o grupo automaticamente.
        </Text>
        
        {MOCK_STUDY_PLAN.map((task) => (
          <TouchableOpacity key={task.id} style={styles.taskCard} activeOpacity={0.7}>
            <View style={[styles.taskIcon, task.done && styles.taskIconDone]}>
              <Ionicons name={task.done ? "checkmark" : "book-outline"} size={20} color="#FFF" />
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.taskTitle, task.done && styles.taskTitleDone]}>{task.title}</Text>
              <Text style={styles.taskPoints}>+{task.points} XP para o grupo</Text>
            </View>
            {task.done && <Text style={styles.doneBadge}>Feito</Text>}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addTaskButton}>
            <Ionicons name="add" size={20} color={colors.primary} />
            <Text style={styles.addTaskText}>Adicionar Tarefa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <ImageBackground source={{ uri: groupData.image }} style={styles.headerBanner}>
          <LinearGradient colors={['transparent', '#121212']} style={styles.gradientOverlay} />
          
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
             <Text style={styles.title}>{groupData.name}</Text>
             <Text style={styles.membersCount}>{groupData.membersCount} membros ativos</Text>
          </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'overview' && styles.tabButtonActive]} 
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>Visão Geral</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'plan' && styles.tabButtonActive]} 
              onPress={() => setActiveTab('plan')}
            >
              <Text style={[styles.tabText, activeTab === 'plan' && styles.tabTextActive]}>Plano de Estudos</Text>
            </TouchableOpacity>
          </View>

          {renderTabContent()}

          {/* Espaço para o botão fixo não cobrir o conteúdo */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* FOOTER FIXO MELHORADO */}
      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.inviteButton} onPress={() => Alert.alert("Convite", "Link copiado!")} activeOpacity={0.8}>
          <Ionicons name="share-social-outline" size={20} color="#000" />
          <Text style={styles.inviteText}>Convidar Amigos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  
  // Header
  headerBanner: { width: '100%', height: 240, justifyContent: 'flex-end' },
  gradientOverlay: { ...StyleSheet.absoluteFillObject, height: '100%' },
  backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20 },
  headerContent: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FFF', marginBottom: 4 },
  membersCount: { color: '#CCC', fontSize: 14 },

  contentContainer: { marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: colors.background },
  
  // Tabs
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, borderBottomWidth: 1, borderBottomColor: '#333' },
  tabButton: { marginRight: 20, paddingBottom: 10 },
  tabButtonActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { color: '#666', fontSize: 16, fontWeight: '600' },
  tabTextActive: { color: '#FFF' },

  tabContent: { padding: 20 },
  description: { color: '#AAA', fontSize: 14, lineHeight: 20, marginBottom: 20 },

  // Stats
  statsCard: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 16, marginBottom: 30, borderWidth: 1, borderColor: '#333' },
  statsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  statsTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  statsValue: { color: colors.primary, fontWeight: 'bold', fontSize: 16 },
  progressBarBg: { height: 8, backgroundColor: '#333', borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  statsFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  statsFooterText: { color: '#888', fontSize: 12 },

  // Members
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  memberRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 12, borderRadius: 12, marginBottom: 8 },
  memberRank: { width: 30, color: '#666', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#FFF', fontWeight: 'bold' },
  memberInfo: { flex: 1 },
  memberName: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  memberXp: { color: '#666', fontSize: 12 },
  hoursText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginLeft: 4 },

  // Study Plan List
  planDescription: { color: '#888', fontSize: 12, marginBottom: 16, fontStyle: 'italic' },
  taskCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  taskIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  taskIconDone: { backgroundColor: colors.success },
  taskTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  taskTitleDone: { color: '#666', textDecorationLine: 'line-through' },
  taskPoints: { color: colors.primary, fontSize: 12, marginTop: 2 },
  doneBadge: { color: colors.success, fontSize: 10, fontWeight: 'bold', marginLeft: 8 },
  
  addTaskButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#444', borderRadius: 12, marginTop: 10 },
  addTaskText: { color: colors.primary, marginLeft: 8, fontWeight: '600' },

  // FOOTER MELHORADO
  footerActions: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    backgroundColor: colors.background, // Fundo para não misturar com o scroll
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30, // Mais espaço na parte inferior
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  inviteButton: { 
    backgroundColor: colors.primary, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 12, 
    gap: 8,
    // Sombra leve
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  inviteText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});