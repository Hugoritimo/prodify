import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme'; // Import ajustado

export default function PreferencesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#FFF" /></TouchableOpacity>
        <Text style={styles.title}>Preferências</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.section}>
         <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Tema</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.valueText}>Escuro</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
         </TouchableOpacity>

         <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Idioma</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.valueText}>Português (BR)</Text>
                <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: colors.surface },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  section: { padding: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  itemText: { color: '#FFF', fontSize: 16 },
  valueText: { color: '#888', marginRight: 10 }
});