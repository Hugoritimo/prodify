import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  nameOutline: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
};

function TabIcon({ name, nameOutline, color, focused }: TabIconProps) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={focused ? name : nameOutline}
        size={24}
        color={color}
      />
      {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={80}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]} />
          )
        ),
      }}
    >
      {/* Tab 1: Home */}
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="home"
              nameOutline="home-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Tab 2: Grupos */}
      <Tabs.Screen
        name="groups/index"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="people"
              nameOutline="people-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      
      {/* Rota Oculta (Detalhes do Grupo) */}
      {/* O Expo Router vai ignorar se o arquivo não existir ainda, sem quebrar */}
      <Tabs.Screen
        name="groups/[id]"
        options={{
          href: null,
        }}
      />

      {/* Tab 3: Ranking (Ajustado para sua pasta atual) */}
      <Tabs.Screen
        name="ranking/index" 
        options={{
          title: 'Ranking', // Ou 'Atividade', se preferir mudar o nome visual
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="trophy" // Usei trophy pois combina mais com Ranking
              nameOutline="trophy-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Tab 4: Perfil */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="person"
              nameOutline="person-outline"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.surface,
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 88 : 80,
    paddingBottom: Platform.OS === 'ios' ? 28 : 25,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});