import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme'; // Import ajustado

export default function PrivacyScreen() {
  const router = useRouter();
  const [publicProfile, setPublicProfile] = useState(true);
  const [showStatus, setShowStatus] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#FFF" /></TouchableOpacity>
        <Text style={styles.title}>Privacidade</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.section}>
         <View style={styles.item}>
            <View>
                <Text style={styles.itemText}>Perfil Público</Text>
                <Text style={styles.itemSub}>Permitir que outros vejam seu XP</Text>
            </View>
            <Switch 
                value={publicProfile} 
                onValueChange={setPublicProfile}
                trackColor={{ false: "#333", true: colors.primary }}
            />
         </View>

         <View style={styles.item}>
            <View>
                <Text style={styles.itemText}>Status Online</Text>
                <Text style={styles.itemSub}>Mostrar quando estou estudando</Text>
            </View>
            <Switch 
                value={showStatus} 
                onValueChange={setShowStatus}
                trackColor={{ false: "#333", true: colors.primary }}
            />
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: colors.surface },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  section: { padding: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  itemText: { color: '#FFF', fontSize: 16 },
  itemSub: { color: '#666', fontSize: 12, marginTop: 4 }
});