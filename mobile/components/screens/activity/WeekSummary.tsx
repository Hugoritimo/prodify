import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface Stat {
  value: string | number;
  label: string;
}

interface WeekSummaryProps {
  stats: Stat[];
}

export function WeekSummary({ stats }: WeekSummaryProps) {
  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Resumo da Semana</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            {index > 0 && <View style={styles.statDivider} />}
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.surfaceLight,
    marginHorizontal: 16,
  },
});
