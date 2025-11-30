import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface Achievement {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
}

interface ProfileHeaderProps {
  name: string;
  handle: string;
  achievements: Achievement[];
  onSettingsPress?: () => void;
  onEditAvatarPress?: () => void;
}

export function ProfileHeader({ 
  name, 
  handle, 
  achievements, 
  onSettingsPress, 
  onEditAvatarPress 
}: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.settingsBtn} onPress={onSettingsPress}>
        <Ionicons name="settings-outline" size={24} color={colors.text} />
      </TouchableOpacity>
      
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.avatarGradient}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={44} color={colors.text} />
          </View>
        </LinearGradient>
        <TouchableOpacity style={styles.editAvatarBtn} onPress={onEditAvatarPress}>
          <Ionicons name="camera" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userHandle}>{handle}</Text>
      
      <View style={styles.achievementsRow}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementBadge}>
            <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
              <Ionicons name={achievement.icon} size={18} color={achievement.color} />
            </View>
            <Text style={styles.achievementLabel}>{achievement.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  settingsBtn: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 3,
  },
  avatar: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  achievementsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  achievementIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
