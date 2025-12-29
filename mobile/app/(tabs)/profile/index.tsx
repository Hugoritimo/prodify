import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, RefreshControl 
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { useAuth } from '../../../src/contexts/AuthContext';
import api from '../../../src/services/api';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const loadProfile = async () => {
    if (!user?.username) return;

    try {
      const response = await api.get(`/user/${user.username}`);
      setProfileData(response.data);
    } catch (error) {
      console.log("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProfile();
  }, []);

  const handleSignOut = () => {
    Alert.alert("Sair", "Deseja realmente desconectar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: signOut }
    ]);
  };

  const currentLevel = profileData ? Math.floor(profileData.points / 1000) + 1 : 1;
  const nextLevelXp = currentLevel * 1000;
  const progress = profileData ? (profileData.points % 1000) / 10 : 0;

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary}/>}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
             {profileData?.avatarUrl ? (
               <Image source={{ uri: profileData.avatarUrl }} style={styles.avatarImage} />
             ) : (
               <Text style={styles.avatarText}>{user?.username?.charAt(0).toUpperCase()}</Text>
             )}
             <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Nv. {currentLevel}</Text>
             </View>
          </View>
          
          <Text style={styles.name}>{profileData?.username || user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.xpContainer}>
            <View style={styles.xpBarBg}>
              <View style={[styles.xpBarFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.xpText}>{profileData?.points || 0} / {nextLevelXp} XP</Text>
          </View>
        </View>

        {/* ESTATÍSTICAS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color="#FF9F43" />
            <Text style={styles.statValue}>{profileData?.streak || 0}</Text>
            <Text style={styles.statLabel}>Dias seguidos</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={24} color={colors.warning || '#FFD700'} />
            <Text style={styles.statValue}>{profileData?.points || 0}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-done-circle" size={24} color={colors.primary} />
            <Text style={styles.statValue}>12</Text> 
            <Text style={styles.statLabel}>Missões</Text>
          </View>
        </View>

        {/* MENU DE OPÇÕES (Links Atualizados para a pasta /settings) */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Conta</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/edit')}>
            <View style={styles.menuIconBox}><Ionicons name="person-outline" size={20} color="#FFF" /></View>
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/notifications')}>
            <View style={styles.menuIconBox}><Ionicons name="notifications-outline" size={20} color="#FFF" /></View>
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/privacy')}>
            <View style={styles.menuIconBox}><Ionicons name="lock-closed-outline" size={20} color="#FFF" /></View>
            <Text style={styles.menuText}>Privacidade</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/preferences')}>
            <View style={styles.menuIconBox}><Ionicons name="settings-outline" size={20} color="#FFF" /></View>
            <Text style={styles.menuText}>Preferências</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Prodify v1.0.0 (Beta)</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 30, backgroundColor: colors.surface },
  
  avatarContainer: { marginBottom: 16, position: 'relative' },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary },
  avatarText: { fontSize: 40, color: colors.primary, fontWeight: 'bold', width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: colors.primary, textAlign: 'center', lineHeight: 90 },
  
  levelBadge: { position: 'absolute', bottom: 0, right: -10, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  levelText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  
  name: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  email: { fontSize: 14, color: '#AAA', marginBottom: 20 },
  
  xpContainer: { width: '60%', alignItems: 'center' },
  xpBarBg: { width: '100%', height: 6, backgroundColor: '#333', borderRadius: 3, marginBottom: 8 },
  xpBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
  xpText: { color: '#888', fontSize: 12 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: -20 },
  statCard: { flex: 1, backgroundColor: '#1E1E1E', marginHorizontal: 4, borderRadius: 16, padding: 16, alignItems: 'center', elevation: 3 },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginVertical: 4 },
  statLabel: { fontSize: 12, color: '#888' },

  menuContainer: { paddingHorizontal: 20, marginTop: 10 },
  menuTitle: { color: '#888', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 8 },
  menuIconBox: { width: 32, height: 32, backgroundColor: '#333', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuText: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '500' },

  logoutButton: { marginHorizontal: 20, marginTop: 20, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#FF4444', alignItems: 'center' },
  logoutText: { color: '#FF4444', fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#444', marginTop: 20, fontSize: 12 }
});