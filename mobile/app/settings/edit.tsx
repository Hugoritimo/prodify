import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../constants/theme';
import { useAuth } from '../../src/contexts/AuthContext';
import api from '../../src/services/api';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth(); // Adicionei o signOut aqui
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Carrega dados
  useEffect(() => {
    async function loadCurrentData() {
      if (!user?.username) return;
      try {
        const response = await api.get(`/user/${user.username}`);
        const { username, bio, avatarUrl } = response.data;
        
        setName(username || '');
        setBio(bio || '');
        
        let fullAvatarUrl = avatarUrl;
        if (avatarUrl && !avatarUrl.startsWith('http')) {
            fullAvatarUrl = `${api.defaults.baseURL}${avatarUrl}`;
        }
        setAvatar(fullAvatarUrl);

      } catch (error) {
        // Se der erro ao carregar dados, pode ser token expirado também
        console.log("Erro ao carregar perfil:", error);
      } finally {
        setLoadingData(false);
      }
    }
    loadCurrentData();
  }, [user]);

  // 2. Escolher Imagem
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Precisamos acessar sua galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // 3. Salvar (COM VERIFICAÇÃO DE TOKEN ANTES DE TENTAR)
  const handleSave = async () => {
    // --- VERIFICAÇÃO DE SEGURANÇA ---
    // @ts-ignore
    const token = api.defaults.headers.common['Authorization'] || api.defaults.headers.Authorization;

    if (!token) {
        Alert.alert(
            "Sessão Inválida", 
            "Você precisa fazer login novamente para salvar alterações.",
            [
                { text: "Fazer Login", onPress: () => {
                    signOut(); // Desloga o usuário
                    router.replace('/auth/login'); // Manda pro login (ajuste a rota se precisar)
                }}
            ]
        );
        return; // PARA TUDO AQUI. Não tenta enviar sem token.
    }
    // --------------------------------

    setSaving(true);
    console.log("🟢 INICIANDO SALVAMENTO...");

    try {
      const baseUrl = api.defaults.baseURL; 
      
      if (avatar && avatar.startsWith('file://')) {
        console.log("📸 Preparando envio da foto...");
        
        const filename = avatar.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        const formData = new FormData();
        // @ts-ignore
        formData.append('file', { uri: avatar, name: filename, type });

        const uploadUrl = `${baseUrl}/user/upload-avatar`;
        console.log(`🚀 Enviando para: ${uploadUrl}`);

        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': token, // Agora temos certeza que o token existe
            'Accept': 'application/json',
          },
        });

        console.log("📡 Status HTTP:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log("❌ Resposta do servidor:", errorText);
            throw new Error(`Erro do servidor: ${response.status}`);
        }
        
        console.log("✅ Foto enviada com sucesso!");
      }

      // await api.patch(`/user/${user.id}`, { username: name, bio }); 

      Alert.alert("Sucesso", "Perfil atualizado! 🚀");
      router.back();

    } catch (error: any) {
      console.error("❌ ERRO NO PROCESSO:", error);
      Alert.alert("Erro de Conexão", "Não foi possível enviar a foto. Verifique se o servidor está rodando.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <ActivityIndicator color={colors.primary} />
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
            {saving ? (
                <ActivityIndicator size="small" color={colors.primary} />
            ) : (
                <Text style={{color: colors.primary, fontWeight: 'bold', fontSize: 16}}>Salvar</Text>
            )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.avatarImage} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                         <Text style={styles.avatarText}>{name?.charAt(0) || 'U'}</Text>
                    </View>
                )}
                
                <View style={styles.cameraBtn}>
                    <Ionicons name="camera" size={16} color="#FFF" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changePhotoText}>Alterar foto</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome de Exibição</Text>
            <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholderTextColor="#666"
            />
        </View>

        <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput 
                style={[styles.input, {height: 100, textAlignVertical: 'top'}]} 
                value={bio} 
                onChangeText={setBio} 
                multiline
                numberOfLines={4}
                placeholder="Conte sobre seus objetivos..."
                placeholderTextColor="#666"
            />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: colors.surface },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  content: { padding: 20 },
  
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatarImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#333' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 40, color: colors.primary, fontWeight: 'bold' },
  
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, padding: 8, borderRadius: 20, borderWidth: 2, borderColor: colors.background },
  changePhotoText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  
  inputGroup: { marginBottom: 20 },
  label: { color: '#888', marginBottom: 8, fontSize: 14 },
  input: { backgroundColor: '#1E1E1E', color: '#FFF', padding: 16, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#333' }
});