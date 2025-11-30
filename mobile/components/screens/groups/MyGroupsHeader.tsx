import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing } from '../../../constants/theme';

interface MyGroupsHeaderProps {
  totalGroups: number;
  onCreateGroup: () => void;
}

export function MyGroupsHeader({ totalGroups, onCreateGroup }: MyGroupsHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Meus Grupos</Text>
        <Text style={styles.subtitle}>{totalGroups} grupos ativos</Text>
      </View>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={onCreateGroup}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={20} color={colors.background} />
        <Text style={styles.createButtonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
  },
});
