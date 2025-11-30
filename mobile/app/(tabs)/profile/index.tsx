import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LogoutButton, MenuList, PremiumCard, ProfileHeader, ProfileStats } from '../../../components/screens/profile';
import { colors } from '../../../constants/theme';

const menuItems = [
  { id: '1', title: 'Editar Perfil', icon: 'person-outline' as const, route: 'edit-profile' },
  { id: '2', title: 'Notificacoes', icon: 'notifications-outline' as const, route: 'notifications' },
  { id: '3', title: 'Privacidade', icon: 'lock-closed-outline' as const, route: 'privacy' },
  { id: '4', title: 'Preferencias', icon: 'settings-outline' as const, route: 'preferences' },
  { id: '5', title: 'Ajuda', icon: 'help-circle-outline' as const, route: 'help' },
  { id: '6', title: 'Sobre', icon: 'information-circle-outline' as const, route: 'about' },
];

const achievements = [
  { id: '1', icon: 'flame' as const, color: colors.primary, label: '7 dias' },
  { id: '2', icon: 'trophy' as const, color: colors.warning, label: 'Top 10%' },
  { id: '3', icon: 'star' as const, color: colors.accent.purple, label: 'Elite' },
];

const profileStats = [
  { value: 142, label: 'Tarefas' },
  { value: 15, label: 'Sequencia', color: colors.success },
  { value: '2.4k', label: 'Pontos', color: colors.warning },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader 
          name="Usuario" 
          handle="@usuario_prodify" 
          achievements={achievements}
        />

        <ProfileStats stats={profileStats} />

        <PremiumCard />

        <MenuList items={menuItems} />

        <LogoutButton />

        <Text style={styles.versionText}>Prodify v1.0.0</Text>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 13,
    color: colors.inactive,
    textAlign: 'center',
  },
});
