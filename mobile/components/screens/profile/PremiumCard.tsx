import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface PremiumCardProps {
  onPress?: () => void;
}

export function PremiumCard({ onPress }: PremiumCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.premiumCard}
      >
        <View style={styles.premiumContent}>
          <Ionicons name="diamond" size={28} color={colors.text} />
          <View style={styles.premiumText}>
            <Text style={styles.premiumTitle}>Prodify Premium</Text>
            <Text style={styles.premiumDescription}>Desbloqueie todos os recursos</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.text} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  premiumText: {
    gap: 2,
  },
  premiumTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
  },
  premiumDescription: {
    fontSize: 13,
    color: colors.transparent.white,
  },
});
