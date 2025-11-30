import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface ActivityListProps {
  title: string;
  activities: Activity[];
  onActivityPress?: (activity: Activity) => void;
}

export function ActivityList({ title, activities, onActivityPress }: ActivityListProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      
      {activities.map((activity) => (
        <TouchableOpacity 
          key={activity.id} 
          style={styles.activityCard} 
          activeOpacity={0.7}
          onPress={() => onActivityPress?.(activity)}
        >
          <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
            <Ionicons name={activity.icon} size={22} color={activity.color} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>{activity.description}</Text>
          </View>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  activityIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  activityDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.inactive,
  },
});
