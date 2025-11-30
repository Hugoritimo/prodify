import { StyleSheet, View } from 'react-native';
import { StatCard } from '../../StatCard';

interface Stat {
  icon: any;
  iconColor: string;
  iconBackground: string;
  value: string | number;
  label: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          iconColor={stat.iconColor}
          iconBackground={stat.iconBackground}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
});
