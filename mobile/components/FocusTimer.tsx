import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Alert, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../constants/theme';
import * as Haptics from 'expo-haptics';

interface FocusTimerProps {
  visible: boolean;
  task: { id: string; title: string; duration: number } | null;
  onCancel: () => void;
  onFinish: (taskId: string) => void;
}

type TimerMode = 'FOCUS' | 'BREAK';
type ScreenState = 'SETUP' | 'RUNNING';

export default function FocusTimer({ visible, task, onCancel, onFinish }: FocusTimerProps) {
  useKeepAwake();

  // Estados de Controle
  const [screenState, setScreenState] = useState<ScreenState>('SETUP');
  const [totalMinutes, setTotalMinutes] = useState(25); // Tempo total planejado
  
  // Estados da Execução
  const [mode, setMode] = useState<TimerMode>('FOCUS');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Controle de Ciclos
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(1);

  // Reinicia o estado quando abre o modal
  useEffect(() => {
    if (visible && task) {
      setScreenState('SETUP');
      setTotalMinutes(task.duration || 25);
      setMode('FOCUS');
      setIsActive(false);
    }
  }, [visible, task]);

  // Lógica do Cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Função que decide o que acontece quando o tempo acaba (Foco -> Pausa -> Foco)
  const handleTimerComplete = async () => {
    // Toca vibração forte
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Vibration.vibrate([0, 500, 200, 500]); 

    if (mode === 'FOCUS') {
      if (currentCycle < totalCycles) {
        // Se ainda tem ciclos, vai para a Pausa
        Alert.alert("Foco concluído!", "Hora de descansar a mente por 5 minutos.");
        setMode('BREAK');
        setTimeLeft(5 * 60); // 5 minutos de pausa
      } else {
        // Acabou tudo!
        setIsActive(false);
        Alert.alert("Sessão Finalizada!", "Você cumpriu sua meta de horas.", [
            { text: "Resgatar XP", onPress: () => task && onFinish(task.id) }
        ]);
      }
    } else {
      // Acabou a Pausa, volta para o Foco
      Alert.alert("Pausa finalizada!", "Bora voltar para o foco total?");
      setMode('FOCUS');
      setCurrentCycle(c => c + 1);
      setTimeLeft(25 * 60); // Volta para 25 min de foco
    }
  };

  // Configura a sessão com base no tempo total escolhido
  const startSession = () => {
    // Exemplo: 60 min = 2 ciclos (25+5, 25+5)
    // A cada 30 min conta 1 ciclo de Pomodoro
    const cycles = Math.max(1, Math.floor(totalMinutes / 30)); 
    
    setTotalCycles(cycles);
    setCurrentCycle(1);
    setMode('FOCUS');
    
    // O primeiro timer sempre será 25 min (padrão Pomodoro) ou o tempo total se for curto
    const firstDuration = totalMinutes < 25 ? totalMinutes : 25;
    setTimeLeft(firstDuration * 60);
    
    setScreenState('RUNNING');
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!visible || !task) return null;

  // --- TELA 1: CONFIGURAÇÃO (SETUP) ---
  if (screenState === 'SETUP') {
    return (
      <Modal animationType="slide" transparent={false} visible={visible}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.setupTitle}>Planeje seu Foco</Text>
          <Text style={styles.setupSubtitle}>{task.title}</Text>

          {/* Seletor de Tempo */}
          <View style={styles.timeSelector}>
            <TouchableOpacity onPress={() => setTotalMinutes(m => Math.max(15, m - 15))}>
                <Ionicons name="remove-circle-outline" size={50} color={colors.primary} />
            </TouchableOpacity>
            
            <View style={styles.timeDisplay}>
                <Text style={styles.timeValue}>{totalMinutes}</Text>
                <Text style={styles.timeUnit}>minutos</Text>
            </View>

            <TouchableOpacity onPress={() => setTotalMinutes(m => m + 15)}>
                <Ionicons name="add-circle-outline" size={50} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Resumo dos Ciclos */}
          <View style={styles.cyclePreview}>
            <Text style={styles.cycleText}>
                Isso renderá <Text style={{fontWeight: 'bold', color: colors.primary}}>
                {Math.max(1, Math.floor(totalMinutes / 30))} ciclos
                </Text> de Pomodoro (25m Foco + 5m Pausa).
            </Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startSession}>
            <Text style={styles.startButtonText}>INICIAR SESSÃO</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  // --- TELA 2: EXECUÇÃO (RUNNING) ---
  return (
    <Modal animationType="fade" transparent={false} visible={visible}>
      <View style={[styles.container, mode === 'BREAK' && styles.breakContainer]}>
        
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <Ionicons name="close" size={30} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.badgeContainer}>
             <Text style={styles.badgeText}>
                {mode === 'FOCUS' ? 'MODO FOCO 🔥' : 'HORA DA PAUSA ☕'}
             </Text>
          </View>

          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.cycleIndicator}>Ciclo {currentCycle} de {totalCycles}</Text>

          <View style={[styles.timerCircle, mode === 'BREAK' && styles.breakCircle]}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.pauseButton} 
            onPress={() => setIsActive(!isActive)}
          >
            <Ionicons name={isActive ? "pause" : "play"} size={40} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.giveUpButton} 
            onPress={() => {
              Alert.alert("Parar tudo?", "Se sair agora, o progresso será perdido.", [
                { text: "Continuar", style: "cancel" },
                { text: "Sair", style: "destructive", onPress: onCancel }
              ]);
            }}
          >
            <Text style={styles.giveUpText}>Desistir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  breakContainer: {
    backgroundColor: '#0F172A', // Azul escuro para descanso
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
  },
  
  // SETUP STYLES
  setupTitle: { fontSize: 24, color: '#FFF', fontWeight: 'bold', marginBottom: 10 },
  setupSubtitle: { fontSize: 18, color: '#AAA', marginBottom: 50 },
  timeSelector: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 30 },
  timeDisplay: { alignItems: 'center', width: 120 },
  timeValue: { fontSize: 60, fontWeight: 'bold', color: '#FFF' },
  timeUnit: { fontSize: 16, color: '#666' },
  cyclePreview: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 10, marginBottom: 50 },
  cycleText: { color: '#CCC', textAlign: 'center', fontSize: 16 },
  startButton: { backgroundColor: colors.primary, width: '100%', padding: 20, borderRadius: 15, alignItems: 'center' },
  startButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },

  // RUNNING STYLES
  content: { alignItems: 'center', width: '100%' },
  badgeContainer: { backgroundColor: '#222', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginBottom: 20 },
  badgeText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1 },
  taskTitle: { color: '#FFF', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  cycleIndicator: { color: '#888', fontSize: 16, marginBottom: 40 },
  
  timerCircle: {
    width: 280, height: 280, borderRadius: 140,
    borderWidth: 8, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 40,
    backgroundColor: '#111',
  },
  breakCircle: {
    borderColor: '#3B82F6', // Azul para break
  },
  timerText: { color: '#FFF', fontSize: 64, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  
  pauseButton: { backgroundColor: '#333', padding: 20, borderRadius: 50, marginBottom: 20 },
  giveUpButton: { padding: 10 },
  giveUpText: { color: '#FF4444', fontSize: 16 },
});