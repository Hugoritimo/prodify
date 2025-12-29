import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  ActivityIndicator, 
  RefreshControl, 
  TouchableOpacity, 
  Modal, 
  Text, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics'; // Para vibração
import { Header } from '../../../components';
import { ProductivityCard, RecentActivities, StatsGrid } from '../../../components/screens/home';
import FocusTimer from '../../../components/FocusTimer'; // <--- O NOVO TIMER IMPORTADO AQUI
import { colors } from '../../../constants/theme';
import { useAuth } from '../../../src/contexts/AuthContext';
import taskService from '../../../src/services/taskService';
import api from '../../../src/services/api';

export default function HomeScreen() {
  const { user } = useAuth();
  
  // Estados de Dados
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  // Estados do Modal de Criação
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [creating, setCreating] = useState(false);

  // Estado do MODO FOCO (Timer)
  const [focusedTask, setFocusedTask] = useState<any>(null);

  // --- BUSCAR DADOS DO BACKEND ---
  const loadHomeData = async () => {
    if (!user?.id && !user?.username) return;

    try {
      const userResponse = await api.get(`/user/${user.username}`); 
      setUserData(userResponse.data);

      const tasksData = await taskService.getTasks(userResponse.data.id);
      const pendingTasks = tasksData.filter((t: any) => !t.completed);
      setTasks(pendingTasks);
      
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadHomeData();
  }, [user]);

  // --- AÇÃO 1: INICIAR O FOCO (Abre o Timer) ---
  function handleStartFocus(task: any) {
    // Abre o modal do cronômetro para essa tarefa
    setFocusedTask(task);
  }

  // --- AÇÃO 2: TERMINOU O TIMER (Ganha XP e Conclui) ---
  async function handleTimerFinish(taskId: string) {
    setFocusedTask(null); // Fecha o timer
    await handleCompleteTask(taskId); // Chama a conclusão real
  }

  // --- AÇÃO 3: CONCLUIR TAREFA NO BACKEND ---
  async function handleCompleteTask(taskId: string) {
    try {
      // 1. Feedback Físico (Vibração)
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // 2. Atualiza visualmente (Otimismo)
      setTasks(oldTasks => oldTasks.filter(t => t.id !== taskId));
      
      // 3. Chama o Backend
      await taskService.completeTask(taskId, userData.id);

      // 4. Recarrega dados
      loadHomeData();

    } catch (error) {
      Alert.alert("Erro", "Falha ao sincronizar conclusão.");
      loadHomeData();
    }
  }

  // --- AÇÃO DE CRIAR TAREFA ---
  async function handleCreateTask() {
    if (!newTaskTitle.trim()) return;
    if (!userData?.id) return;

    try {
      setCreating(true);
      await taskService.createTask(newTaskTitle, 25, userData.id); // Padrão 25min
      setModalVisible(false);
      setNewTaskTitle('');
      loadHomeData(); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a tarefa.");
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const dynamicStats = [
    { 
      icon: 'checkmark-done' as const, 
      iconColor: colors.primary, 
      iconBackground: colors.transparent.primary, 
      value: tasks.length, 
      label: 'Pendentes' 
    },
    { 
      icon: 'flame' as const, 
      iconColor: colors.success, 
      iconBackground: colors.transparent.success, 
      value: userData?.streak || 0, 
      label: 'Dias seguidos' 
    },
    { 
      icon: 'trophy' as const, 
      iconColor: colors.info, 
      iconBackground: colors.transparent.info, 
      value: userData?.points || 0, 
      label: 'XP Total' 
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header 
        title={userData?.username || "Guerreiro"} 
        subtitle="Hora de focar," 
        showNotification 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        <ProductivityCard 
          percentage={userData?.points ? Math.min((userData.points / 1000) * 100, 100) : 0} 
          period="Próximo Nível" 
        />
        
        <StatsGrid stats={dynamicStats} />

        {/* --- LISTA DE TAREFAS --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Missões de Hoje</Text>
        </View>

        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Sem missões ativas. Crie um desafio!</Text>
          </View>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskSub}>{task.duration} min • Valendo 10 XP</Text>
              </View>
              
              {/* BOTÃO DE PLAY (Inicia o Timer) */}
              <TouchableOpacity 
                style={styles.checkButton}
                activeOpacity={0.6}
                onPress={() => handleStartFocus(task)}
              >
                <Ionicons name="play-circle-outline" size={32} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ))
        )}
        
        <RecentActivities 
          activities={userData?.activities || []} 
          onSeeAll={() => {}} 
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* FAB (Botão Flutuante) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8} 
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      {/* --- MODAL DE NOVA TAREFA --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Missão</Text>
            <Text style={styles.modalSubtitle}>Defina seu foco agora:</Text>
            
            <TextInput 
              style={styles.input}
              placeholder="Ex: Ler 10 páginas"
              placeholderTextColor="#666"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
              onSubmitEditing={handleCreateTask}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.confirmButton]}
                onPress={handleCreateTask}
                disabled={creating}
              >
                {creating ? (
                  <ActivityIndicator color="#121212" />
                ) : (
                  <Text style={styles.confirmButtonText}>Criar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* --- MODAL DO TIMER (MODO FOCO) --- */}
      <FocusTimer 
        visible={!!focusedTask}
        task={focusedTask}
        onCancel={() => setFocusedTask(null)}
        onFinish={handleTimerFinish}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  
  sectionHeader: { marginTop: 24, marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  taskCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskInfo: { flex: 1, paddingRight: 10 },
  taskTitle: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  taskSub: { color: '#AAA', fontSize: 12, marginTop: 4 },
  checkButton: { padding: 4 },
  
  emptyState: { padding: 30, alignItems: 'center', opacity: 0.7 },
  emptyText: { color: '#666', fontStyle: 'italic', fontSize: 14 },

  fab: {
    position: 'absolute',
    bottom: 90, 
    right: 20,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2A2A2A',
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#121212',
    fontWeight: 'bold',
  },
});