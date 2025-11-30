import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../../constants/theme';

interface Stat {
  value: string | number;
  label: string;
  color?: string;
}

interface ProfileStatsProps {
  stats: Stat[];
  style?: ViewStyle;
}

export function ProfileStats({ stats, style }: ProfileStatsProps) {
  return (
    <View style={[styles.statsContainer, style]}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <Text style={[styles.statValue, stat.color ? { color: stat.color } : null]}>
            {stat.value}
          </Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
