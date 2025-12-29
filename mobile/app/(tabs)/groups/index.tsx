import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../../components';
import { 
  GroupsList, 
  MyGroupsHeader, 
  CreateGroupModal 
} from '../../../components/screens/groups';
import { colors } from '../../../constants/theme';

// DADOS MOCKADOS INICIAIS
const INITIAL_GROUPS = [
  {
    id: '1',
    name: 'Estudantes de Medicina',
    description: 'Foco total na residência! 🩺',
    members: 24,
    yourRank: 3,
    totalStudyTime: '156h',
    weeklyGoal: 200,
    weeklyProgress: 85,
    lastActivity: 'Há 5 min',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200',
  },
  {
    id: '2',
    name: 'Concurseiros 2025',
    description: 'Rumo à aprovação no federal.',
    members: 156,
    yourRank: 12,
    totalStudyTime: '89h',
    weeklyGoal: 300,
    weeklyProgress: 62,
    lastActivity: 'Há 30 min',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200',
  },
];

export default function GroupsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [modalVisible, setModalVisible] = useState(false);

  // --- AÇÃO DE NAVEGAÇÃO CORRIGIDA ---
  // Agora passamos os dados do grupo como parâmetros
  const handleGroupPress = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    
    if (group) {
      router.push({
        pathname: `/(tabs)/groups/${groupId}`,
        params: {
          name: group.name,
          description: group.description || 'Sem descrição definida.',
          image: group.image,
          membersCount: group.members,
          weeklyGoal: group.weeklyGoal,
          currentHours: 156 // Mockado por enquanto
        }
      } as any);
    }
  };

  const handleCreateGroup = (name: string, description: string, goal: number) => {
    const newGroup = {
      id: String(Date.now()),
      name: name,
      description: description,
      members: 1,
      yourRank: 1,
      totalStudyTime: '0h',
      weeklyGoal: goal,
      weeklyProgress: 0,
      lastActivity: 'Agora',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200',
    };

    setGroups([newGroup, ...groups]); 
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Grupos" subtitle="Seus Squads" showNotification />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MyGroupsHeader totalGroups={groups.length} onCreateGroup={() => setModalVisible(true)} />
        <GroupsList groups={groups} onGroupPress={handleGroupPress} />
        <View style={{ height: 100 }} />
      </ScrollView>

      <CreateGroupModal visible={modalVisible} onClose={() => setModalVisible(false)} onCreate={handleCreateGroup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20 },
});