import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, spacing } from '../../../constants/theme';

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, goal: number) => void;
}

export function CreateGroupModal({ visible, onClose, onCreate }: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('20'); // Meta padrão de 20h
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    // Simula um delay de rede para parecer real
    setTimeout(() => {
      onCreate(name, description, Number(goal));
      setLoading(false);
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setGoal('20');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* Cabeçalho do Modal */}
          <View style={styles.header}>
            <Text style={styles.title}>Novo Squad 🚀</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Junte a galera para focar mais.</Text>

          {/* Formuário */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome do Grupo</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: Medicina USP 2025"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição curta</Text>
              <TextInput 
                style={styles.input}
                placeholder="Ex: Foco total na aprovação!"
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Meta Semanal (horas combinadas)</Text>
              <View style={styles.goalContainer}>
                <TouchableOpacity 
                  style={styles.goalButton} 
                  onPress={() => setGoal(String(Math.max(5, Number(goal) - 5)))}
                >
                  <Ionicons name="remove" size={20} color="#FFF" />
                </TouchableOpacity>
                
                <View style={styles.goalDisplay}>
                   <Text style={styles.goalValue}>{goal}h</Text>
                </View>

                <TouchableOpacity 
                  style={styles.goalButton}
                  onPress={() => setGoal(String(Number(goal) + 5))}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Botão de Ação */}
          <TouchableOpacity 
            style={[styles.createButton, !name.trim() && styles.disabledButton]}
            onPress={handleCreate}
            disabled={!name.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.createButtonText}>Criar Grupo</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Fundo escuro transparente
    justifyContent: 'flex-end', // Modal vem de baixo
  },
  container: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  
  // Controle de Meta
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  goalButton: {
    backgroundColor: '#333',
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalDisplay: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  goalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },

  // Botão Principal
  createButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});