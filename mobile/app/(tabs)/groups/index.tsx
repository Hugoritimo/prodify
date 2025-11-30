import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../../components';
import { GroupsList, MyGroupsHeader } from '../../../components/screens/groups';
import { colors } from '../../../constants/theme';

// Dados mockados dos grupos
const myGroups = [
  {
    id: '1',
    name: 'Estudantes de Medicina',
    members: 24,
    yourRank: 3,
    totalStudyTime: '156h',
    weeklyGoal: 20,
    weeklyProgress: 85,
    lastActivity: 'Há 5 min',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200',
  },
  {
    id: '2',
    name: 'Concurseiros 2025',
    members: 156,
    yourRank: 12,
    totalStudyTime: '89h',
    weeklyGoal: 30,
    weeklyProgress: 62,
    lastActivity: 'Há 30 min',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200',
  },
  {
    id: '3',
    name: 'Dev Squad',
    members: 8,
    yourRank: 1,
    totalStudyTime: '234h',
    weeklyGoal: 25,
    weeklyProgress: 100,
    lastActivity: 'Há 2 horas',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200',
  },
];

export default function GroupsScreen() {
  const router = useRouter();

  const handleGroupPress = (groupId: string) => {
    router.push(`/(tabs)/groups/${groupId}` as any);
  };

  const handleCreateGroup = () => {
    // TODO: Abrir modal de criação de grupo
    console.log('Create group');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header 
        title="Grupos" 
        subtitle="Seus" 
        showNotification 
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MyGroupsHeader 
          totalGroups={myGroups.length}
          onCreateGroup={handleCreateGroup}
        />
        
        <GroupsList 
          groups={myGroups}
          onGroupPress={handleGroupPress}
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
