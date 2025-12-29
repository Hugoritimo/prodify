import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme'; // Import ajustado

export default function NotificationsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [groupAlerts, setGroupAlerts] = useState(true);

  const ToggleItem = ({ label, value, onValueChange }: any) => (
    <View style={styles.item}>
        <Text style={styles.itemText}>{label}</Text>
        <Switch 
            value={value} 
            onValueChange={onValueChange}
            trackColor={{ false: "#333", true: colors.primary }}
            thumbColor={value ? "#FFF" : "#f4f3f4"}
        />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#FFF" /></TouchableOpacity>
        <Text style={styles.title}>Notificações</Text>
        <View style={{width: 24}} /> 
      </View>

      <View style={styles.section}>
         <ToggleItem label="Notificações Push" value={pushEnabled} onValueChange={setPushEnabled} />
         <ToggleItem label="Alertas de Grupos" value={groupAlerts} onValueChange={setGroupAlerts} />
         <ToggleItem label="E-mails de Marketing" value={emailEnabled} onValueChange={setEmailEnabled} />
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
  itemText: { color: '#FFF', fontSize: 16 }
});