import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useVideoContext } from '../context/VideoContext';
import { RootStackParamList, Video } from '../types';
import { globalStyles, colors } from '../styles/globalStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const { videos } = useVideoContext();
  const navigation = useNavigation<NavigationProp>();
  
  const userVideos = videos.filter(video => video.uploader === 'Luca Rossi');

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => navigation.navigate('VideoDetail', { video: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.videoMeta}>
          🎯 {item.group}
        </Text>
        <Text style={styles.videoDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={globalStyles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎬</Text>
      <Text style={globalStyles.emptyText}>Ancora nessun video</Text>
      <Text style={globalStyles.emptySubText}>
        Vai alla sezione "Carica" per{'\n'}
        caricare il tuo primo video!
      </Text>
    </View>
  );

  const renderHeader = () => (
    <>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Luca Rossi</Text>
          <Text style={styles.bio}>Appassionato di viaggi e video 🎥</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userVideos.length}</Text>
              <Text style={styles.statLabel}>Video</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Visualizzazioni</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>Mi piace</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>I tuoi video</Text>
        {userVideos.length > 0 && (
          <Text style={styles.sectionSubtitle}>
            {userVideos.length} video caricati
          </Text>
        )}
      </View>
    </>
  );

  return (
    <View style={globalStyles.screen}>
      <FlatList
        data={userVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={userVideos.length === 0 ? { flex: 1 } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eeeeee',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eeeeee',
    marginRight: 12,
  },
  videoInfo: {
    flex: 1,
    marginRight: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
});

export default ProfileScreen;