import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';

interface ActivityCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  subtitle?: string;
  time: string;
  onPress?: () => void;
}

export function ActivityCard({ icon, iconColor, title, subtitle, time, onPress }: ActivityCardProps) {
  return (
    <TouchableOpacity 
      style={styles.activityCard} 
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={[styles.activityIcon, { backgroundColor: `${iconColor}20` }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        {subtitle && <Text style={styles.activitySubtitle}>{subtitle}</Text>}
      </View>
      {time && <Text style={styles.activityTime}>{time}</Text>}
      {!time && <Ionicons name="chevron-forward" size={20} color={colors.inactive} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  activitySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.inactive,
  },
});
