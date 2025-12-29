import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Importante
import { colors, borderRadius } from '../../constants/theme';
import { useAuth } from '../../src/contexts/AuthContext'; // Para pegar o ID/Username
import api from '../../src/services/api';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth(); // updateUser servirá para atualizar o contexto local se precisar
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Carrega os dados atuais do usuário ao abrir a tela
  useEffect(() => {
    async function loadCurrentData() {
      if (!user?.username) return;
      try {
        const response = await api.get(`/user/${user.username}`);
        const { username, bio, avatarUrl } = response.data;
        
        setName(username || '');
        setBio(bio || '');
        setAvatar(avatarUrl);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar seus dados.");
      } finally {
        setLoadingData(false);
      }
    }
    loadCurrentData();
  }, [user]);

  // 2. Função para escolher imagem da galeria
  const pickImage = async () => {
    // Pede permissão
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Precisamos acessar sua galeria para trocar a foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite cortar a foto quadrada
      aspect: [1, 1],
      quality: 0.7, // Reduz um pouco a qualidade para não pesar no upload
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri); // Mostra a preview da nova imagem
    }
  };

  // 3. Salvar alterações (Upload + Update)
  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);

    try {
      // Prepara o formulário para envio (Multipart para enviar arquivo)
      const formData = new FormData();
      formData.append('username', name);
      formData.append('bio', bio);

      // Se tiver uma imagem nova (que comece com file://), adiciona ao envio
      if (avatar && avatar.startsWith('file://')) {
        const filename = avatar.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        // @ts-ignore: O React Native aceita esse objeto como arquivo
        formData.append('file', { uri: avatar, name: filename, type });
      }

      // IMPORTANTE: Seu backend precisa ter uma rota PUT/PATCH que aceite Multipart/Form-Data
      // Se não tiver upload de arquivo no backend ainda, vai atualizar só o texto
      // Aqui estou assumindo uma rota genérica de update
      await api.patch(`/user/${user.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert("Sucesso", "Perfil atualizado!");
      router.back();

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao atualizar perfil. Tente novamente.");
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
        {/* Seção de Avatar */}
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

        {/* Inputs */}
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