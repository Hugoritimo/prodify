import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../constants/theme';

interface ProductivityCardProps {
  percentage: number;
  period: string;
}

export function ProductivityCard({ percentage, period }: ProductivityCardProps) {
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.mainCard}
    >
      <View style={styles.mainCardContent}>
        <Text style={styles.mainCardTitle}>Sua Produtividade</Text>
        <Text style={styles.mainCardValue}>{percentage}%</Text>
        <Text style={styles.mainCardSubtitle}>{period}</Text>
      </View>
      <Ionicons 
        name="trending-up" 
        size={80} 
        color={colors.transparent.whiteLow} 
        style={styles.mainCardIcon} 
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },
  mainCardContent: {
    zIndex: 1,
  },
  mainCardTitle: {
    fontSize: 16,
    color: colors.transparent.white,
    marginBottom: 8,
  },
  mainCardValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
  },
  mainCardSubtitle: {
    fontSize: 14,
    color: colors.transparent.whiteMedium,
    marginTop: 4,
  },
  mainCardIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
