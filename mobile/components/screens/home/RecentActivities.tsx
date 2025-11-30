import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface Activity {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  title: string;
  time: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  onSeeAll?: () => void;
}

export function RecentActivities({ activities, onSeeAll }: RecentActivitiesProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Atividades Recentes</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllBtn}>Ver tudo</Text>
        </TouchableOpacity>
      </View>

      {activities.map((activity, index) => (
        <View key={index} style={styles.activityCard}>
          <View style={[styles.activityIcon, { backgroundColor: activity.iconBackground }]}>
            <Ionicons name={activity.icon} size={20} color={activity.iconColor} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.inactive} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllBtn: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 14,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  activityTime: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
