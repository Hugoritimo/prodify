import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBackground: string;
  value: string | number;
  label: string;
}

export function StatCard({ icon, iconColor, iconBackground, value, label }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});