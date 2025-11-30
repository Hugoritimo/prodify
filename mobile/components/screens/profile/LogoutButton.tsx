import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../constants/theme';

interface LogoutButtonProps {
  onPress?: () => void;
}

export function LogoutButton({ onPress }: LogoutButtonProps) {
  return (
    <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7} onPress={onPress}>
      <Ionicons name="log-out-outline" size={22} color={colors.primary} />
      <Text style={styles.logoutText}>Sair da conta</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent.errorLight,
    marginHorizontal: 20,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
