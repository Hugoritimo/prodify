import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing } from '../../../constants/theme';

interface GroupCardProps {
  id: string;
  name: string;
  members: number;
  yourRank: number;
  totalStudyTime: string;
  weeklyGoal: number;
  weeklyProgress: number;
  lastActivity: string;
  image: string;
  onPress?: (id: string) => void;
}

export function GroupCard({
  id,
  name,
  members,
  yourRank,
  totalStudyTime,
  weeklyProgress,
  lastActivity,
  image,
  onPress,
}: GroupCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return colors.warning;
    if (rank === 2) return colors.textSecondary;
    if (rank === 3) return '#CD7F32';
    return colors.text;
  };

  const getRankIcon = (rank: number): keyof typeof Ionicons.glyphMap => {
    if (rank <= 3) return 'trophy';
    return 'ribbon';
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress?.(id)}
    >
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.groupImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.groupName} numberOfLines={1}>{name}</Text>
          <View style={styles.membersRow}>
            <Ionicons name="people" size={14} color={colors.textSecondary} />
            <Text style={styles.membersText}>{members} membros</Text>
          </View>
        </View>
        <View style={[styles.rankBadge, { backgroundColor: `${getRankColor(yourRank)}20` }]}>
          <Ionicons name={getRankIcon(yourRank)} size={14} color={getRankColor(yourRank)} />
          <Text style={[styles.rankText, { color: getRankColor(yourRank) }]}>#{yourRank}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color={colors.info} />
          <Text style={styles.statValue}>{totalStudyTime}</Text>
          <Text style={styles.statLabel}>total</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Ionicons name="trending-up" size={16} color={colors.primary} />
          <Text style={styles.statValue}>{weeklyProgress}%</Text>
          <Text style={styles.statLabel}>meta semanal</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Ionicons name="pulse" size={16} color={colors.accent.purple} />
          <Text style={styles.statValue}>{lastActivity}</Text>
          <Text style={styles.statLabel}>atividade</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(weeklyProgress, 100)}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  membersText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: colors.surfaceLight,
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
});
