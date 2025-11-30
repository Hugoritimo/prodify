import { StyleSheet, View } from 'react-native';
import { GroupCard } from './GroupCard';

interface Group {
  id: string;
  name: string;
  members: number;
  yourRank: number;
  totalStudyTime: string;
  weeklyGoal: number;
  weeklyProgress: number;
  lastActivity: string;
  image: string;
}

interface GroupsListProps {
  groups: Group[];
  onGroupPress?: (groupId: string) => void;
}

export function GroupsList({ groups, onGroupPress }: GroupsListProps) {
  return (
    <View style={styles.container}>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          {...group}
          onPress={onGroupPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
});
