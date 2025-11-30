import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { borderRadius, colors } from '../../../constants/theme';

// Dados mockados do grupo
const groupData = {
  id: '1',
  name: 'Estudantes de Medicina',
  description: 'Grupo para estudantes de medicina focados em passar na residência',
  members: 24,
  image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200',
  weeklyGoal: 20,
};

// Dados mockados dos membros (ranking)
const leaderboard = [
  { 
    id: '1', 
    name: 'Maria Silva', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    studyTime: '32h 45min',
    streak: 15,
    rank: 1,
  },
  { 
    id: '2', 
    name: 'João Santos', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    studyTime: '28h 30min',
    streak: 12,
    rank: 2,
  },
  { 
    id: '3', 
    name: 'Você', 
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    studyTime: '24h 15min',
    streak: 7,
    rank: 3,
    isCurrentUser: true,
  },
  { 
    id: '4', 
    name: 'Ana Costa', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    studyTime: '22h 00min',
    streak: 5,
    rank: 4,
  },
  { 
    id: '5', 
    name: 'Pedro Lima', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    studyTime: '18h 45min',
    streak: 3,
    rank: 5,
  },
];

// Dados mockados dos posts do feed
const feedPosts = [
  {
    id: '1',
    user: {
      name: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    content: 'Finalizei mais um capítulo de Anatomia! 💪 Foco total para a prova da semana que vem.',
    studyImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    studyTime: '2h 30min',
    subject: 'Anatomia',
    likes: 12,
    comments: 3,
    createdAt: 'Há 30 min',
    isLiked: true,
  },
  {
    id: '2',
    user: {
      name: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    content: 'Revisão completa de Farmacologia! Quem mais está estudando isso? 📚',
    studyImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
    studyTime: '3h 00min',
    subject: 'Farmacologia',
    likes: 8,
    comments: 5,
    createdAt: 'Há 2 horas',
    isLiked: false,
  },
  {
    id: '3',
    user: {
      name: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    content: 'Maratona de questões de Fisiologia hoje! Acertei 85% 🎯',
    studyImage: null,
    studyTime: '1h 45min',
    subject: 'Fisiologia',
    likes: 15,
    comments: 7,
    createdAt: 'Há 5 horas',
    isLiked: true,
  },
];

type TabType = 'feed' | 'ranking';

export default function GroupDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [posts, setPosts] = useState(feedPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return colors.warning;
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return colors.text;
  };

  const getRankIcon = (rank: number): keyof typeof Ionicons.glyphMap => {
    if (rank === 1) return 'trophy';
    if (rank === 2) return 'medal';
    if (rank === 3) return 'ribbon';
    return 'ribbon-outline';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={{ uri: groupData.image }} style={styles.groupImage} />
          <View style={styles.headerText}>
            <Text style={styles.groupName}>{groupData.name}</Text>
            <Text style={styles.memberCount}>{groupData.members} membros</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'feed' && styles.tabActive]}
          onPress={() => setActiveTab('feed')}
        >
          <Ionicons 
            name="newspaper" 
            size={18} 
            color={activeTab === 'feed' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[styles.tabText, activeTab === 'feed' && styles.tabTextActive]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ranking' && styles.tabActive]}
          onPress={() => setActiveTab('ranking')}
        >
          <Ionicons 
            name="podium" 
            size={18} 
            color={activeTab === 'ranking' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[styles.tabText, activeTab === 'ranking' && styles.tabTextActive]}>
            Ranking
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'feed' ? (
          /* Feed Tab */
          <View>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                  <Image source={{ uri: post.user.avatar }} style={styles.postAvatar} />
                  <View style={styles.postUserInfo}>
                    <Text style={styles.postUserName}>{post.user.name}</Text>
                    <Text style={styles.postTime}>{post.createdAt}</Text>
                  </View>
                  <View style={styles.subjectBadge}>
                    <Text style={styles.subjectText}>{post.subject}</Text>
                  </View>
                </View>

                {/* Study Stats */}
                <View style={styles.studyStats}>
                  <View style={styles.studyStat}>
                    <Ionicons name="time" size={16} color={colors.info} />
                    <Text style={styles.studyStatText}>{post.studyTime}</Text>
                  </View>
                </View>

                {/* Post Content */}
                <Text style={styles.postContent}>{post.content}</Text>

                {/* Study Image */}
                {post.studyImage && (
                  <Image source={{ uri: post.studyImage }} style={styles.studyImage} />
                )}

                {/* Post Actions */}
                <View style={styles.postActions}>
                  <TouchableOpacity 
                    style={styles.postAction}
                    onPress={() => handleLike(post.id)}
                  >
                    <Ionicons 
                      name={post.isLiked ? 'heart' : 'heart-outline'} 
                      size={22} 
                      color={post.isLiked ? colors.error : colors.textSecondary} 
                    />
                    <Text style={[
                      styles.postActionText,
                      post.isLiked && { color: colors.error }
                    ]}>
                      {post.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="chatbubble-outline" size={20} color={colors.textSecondary} />
                    <Text style={styles.postActionText}>{post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.postAction}>
                    <Ionicons name="share-outline" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* Ranking Tab */
          <View>
            {/* Weekly Stats */}
            <View style={styles.weeklyStatsCard}>
              <Text style={styles.weeklyStatsTitle}>🏆 Ranking Semanal</Text>
              <Text style={styles.weeklyStatsSubtitle}>
                Compete de forma saudável com seus amigos!
              </Text>
            </View>

            {/* Leaderboard */}
            {leaderboard.map((member, index) => (
              <View 
                key={member.id} 
                style={[
                  styles.leaderboardItem,
                  member.isCurrentUser && styles.leaderboardItemCurrentUser
                ]}
              >
                <View style={styles.rankContainer}>
                  {member.rank <= 3 ? (
                    <View style={[styles.rankBadge, { backgroundColor: `${getRankColor(member.rank)}20` }]}>
                      <Ionicons name={getRankIcon(member.rank)} size={18} color={getRankColor(member.rank)} />
                    </View>
                  ) : (
                    <Text style={styles.rankNumber}>#{member.rank}</Text>
                  )}
                </View>
                <Image source={{ uri: member.avatar }} style={styles.leaderboardAvatar} />
                <View style={styles.leaderboardInfo}>
                  <Text style={[
                    styles.leaderboardName,
                    member.isCurrentUser && styles.leaderboardNameCurrentUser
                  ]}>
                    {member.name}
                  </Text>
                  <View style={styles.leaderboardStats}>
                    <View style={styles.leaderboardStat}>
                      <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                      <Text style={styles.leaderboardStatText}>{member.studyTime}</Text>
                    </View>
                    <View style={styles.leaderboardStat}>
                      <Ionicons name="flame" size={12} color={colors.warning} />
                      <Text style={styles.leaderboardStatText}>{member.streak} dias</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.timeBadge}>
                  <Ionicons name="time" size={14} color={colors.info} />
                  <Text style={styles.timeBadgeText}>{member.studyTime}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB - New Post */}
      {activeTab === 'feed' && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setShowNewPostModal(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color={colors.background} />
        </TouchableOpacity>
      )}

      {/* New Post Modal */}
      <NewPostModal 
        visible={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
        onPost={(newPost) => {
          setPosts([newPost, ...posts]);
          setShowNewPostModal(false);
        }}
      />
    </View>
  );
}

// Componente do Modal de Novo Post
interface NewPostModalProps {
  visible: boolean;
  onClose: () => void;
  onPost: (post: typeof feedPosts[0]) => void;
}

function NewPostModal({ visible, onClose, onPost }: NewPostModalProps) {
  const [content, setContent] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [subject, setSubject] = useState('');

  const handlePost = () => {
    if (!content || !studyTime || !subject) return;

    const newPost = {
      id: Date.now().toString(),
      user: {
        name: 'Você',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      },
      content,
      studyImage: null,
      studyTime,
      subject,
      likes: 0,
      comments: 0,
      createdAt: 'Agora',
      isLiked: false,
    };

    onPost(newPost);
    setContent('');
    setStudyTime('');
    setSubject('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Compartilhar Estudo</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            {/* Study Stats Inputs */}
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  <Ionicons name="time" size={14} color={colors.info} /> Tempo
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 2h 30min"
                  placeholderTextColor={colors.inactive}
                  value={studyTime}
                  onChangeText={setStudyTime}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  <Ionicons name="book" size={14} color={colors.primary} /> Matéria
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Matemática..."
                  placeholderTextColor={colors.inactive}
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>
            </View>

            <View style={styles.inputGroupFull}>
              <Text style={styles.inputLabel}>
                <Ionicons name="create" size={14} color={colors.accent.purple} /> O que você estudou?
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Conte sobre o seu estudo de hoje..."
                placeholderTextColor={colors.inactive}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={content}
                onChangeText={setContent}
              />
            </View>

            {/* Add Photo Button */}
            <TouchableOpacity style={styles.addPhotoButton}>
              <Ionicons name="camera-outline" size={24} color={colors.primary} />
              <Text style={styles.addPhotoText}>Adicionar foto do resumo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[
              styles.postButton,
              (!content || !studyTime || !subject) && styles.postButtonDisabled
            ]}
            onPress={handlePost}
            disabled={!content || !studyTime || !subject}
          >
            <Text style={styles.postButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceLight,
  },
  headerText: {
    marginLeft: 10,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  memberCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  tabActive: {
    backgroundColor: colors.transparent.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  // Post Card Styles
  postCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceLight,
  },
  postUserInfo: {
    flex: 1,
    marginLeft: 10,
  },
  postUserName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  postTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  subjectBadge: {
    backgroundColor: colors.transparent.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  studyStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  studyStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  studyStatText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
  },
  postContent: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  studyImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
    marginBottom: 12,
    backgroundColor: colors.surfaceLight,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postActionText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  // Leaderboard Styles
  weeklyStatsCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  weeklyStatsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  weeklyStatsSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 10,
  },
  leaderboardItemCurrentUser: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.transparent.primary,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  leaderboardAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 8,
    backgroundColor: colors.surfaceLight,
  },
  leaderboardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  leaderboardName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  leaderboardNameCurrentUser: {
    color: colors.primary,
  },
  leaderboardStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  leaderboardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leaderboardStatText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.transparent.info,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  timeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.info,
  },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  modalBody: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: {
    flex: 1,
  },
  inputGroupFull: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  postButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});
