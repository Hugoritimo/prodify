import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  ActivityIndicator, 
  Image 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import api from '../../../src/services/api';
import { useAuth } from '../../../src/contexts/AuthContext';

export default function RankingScreen() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Busca os dados do Backend
  const loadRanking = async () => {
    try {
      // Chama a rota que criamos no UserController
      const response = await api.get('/user/leaderboard/global');
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar ranking", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRanking();
  }, []);

  // Renderiza cada item da lista (Card do Usuário)
  const renderItem = ({ item, index }: { item: any, index: number }) => {
    const isMe = item.username === user?.username;
    
    // Define as cores das medalhas para o Top 3
    let badgeColor = '#444'; // Cor padrão (cinza escuro)
    let iconName: any = null;

    if (index === 0) { badgeColor = '#FFD700'; iconName = 'trophy'; }      // Ouro
    else if (index === 1) { badgeColor = '#C0C0C0'; iconName = 'medal'; }  // Prata
    else if (index === 2) { badgeColor = '#CD7F32'; iconName = 'medal'; }  // Bronze

    return (
      <View style={[styles.card, isMe && styles.myCard]}>
        
        {/* 1. Coluna da Posição */}
        <View style={styles.rankContainer}>
          {index < 3 ? (
            <Ionicons name={iconName} size={28} color={badgeColor} />
          ) : (
            <Text style={styles.rankText}>#{index + 1}</Text>
          )}
        </View>

        {/* 2. Coluna do Usuário (Avatar + Nome) */}
        <View style={styles.userInfo}>
            {/* Avatar Placeholder (Círculo com a inicial) */}
            <View style={[styles.avatarPlaceholder, { borderColor: badgeColor }]}>
                {item.avatarUrl ? (
                   <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
                ) : (
                   <Text style={[styles.avatarLetter, { color: index < 3 ? badgeColor : '#FFF' }]}>
                     {item.username.charAt(0).toUpperCase()}
                   </Text>
                )}
            </View>
            
            <View>
                <Text style={[styles.username, isMe && { color: colors.primary }]}>
                    {item.username} {isMe && <Text style={{fontSize: 12}}> (Você)</Text>}
                </Text>
                <Text style={styles.streakText}>🔥 {item.streak} dias seguidos</Text>
            </View>
        </View>

        {/* 3. Coluna dos Pontos */}
        <View style={styles.pointsContainer}>
            <Text style={[styles.pointsValue, { color: index < 3 ? badgeColor : '#FFF' }]}>
                {item.points}
            </Text>
            <Text style={styles.pointsLabel}>XP</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Ranking Global 🏆</Text>
        <Text style={styles.subtitle}>Os guerreiros mais focados da semana</Text>
      </View>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh} 
                tintColor={colors.primary} 
            />
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Ninguém pontuou ainda. Seja o primeiro!</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    paddingTop: 60 // Espaço para a StatusBar
  },
  header: { 
    paddingHorizontal: 20, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FFF' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#AAA', 
    marginTop: 4 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  
  // Estilo do Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    // Sombra leve
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  myCard: {
    borderColor: colors.primary, // Borda verde para o seu usuário
    backgroundColor: 'rgba(37, 211, 102, 0.08)', // Fundo levemente verde
  },
  
  // Posição (#1, #2...)
  rankContainer: { 
    width: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 10
  },
  rankText: { 
    color: '#888', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  
  // Info do Usuário
  userInfo: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  avatarPlaceholder: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#2A2A2A',
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  avatarLetter: { 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  username: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  streakText: { 
    color: '#888', 
    fontSize: 12 
  },
  
  // Pontos XP
  pointsContainer: { 
    alignItems: 'flex-end',
    minWidth: 60
  },
  pointsValue: { 
    fontSize: 18, 
    fontWeight: '900' 
  },
  pointsLabel: { 
    color: '#666', 
    fontSize: 10, 
    fontWeight: 'bold',
    textTransform: 'uppercase' 
  },
  
  empty: { 
    color: '#666', 
    textAlign: 'center', 
    marginTop: 50,
    fontStyle: 'italic'
  }
});