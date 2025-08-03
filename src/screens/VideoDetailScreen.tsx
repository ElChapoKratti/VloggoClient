import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/index';
import { globalStyles, colors } from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoDetail'>;

const MOCK_COMMENTS = [
  {
    id: '1',
    author: 'Maria Bianchi',
    text: 'Bellissimo video! Mi hai fatto venire voglia di viaggiare! 🌟',
    avatar: 'https://i.pravatar.cc/40?img=2',
    time: '2 ore fa',
  },
  {
    id: '2',
    author: 'Giuseppe Verde',
    text: 'Fantastico! Dove hai girato questo video? Sembra un posto incredibile!',
    avatar: 'https://i.pravatar.cc/40?img=3',
    time: '4 ore fa',
  },
  {
    id: '3',
    author: 'Anna Rossi',
    text: 'Complimenti per la qualità del video! Molto professionale 👏',
    avatar: 'https://i.pravatar.cc/40?img=4',
    time: '1 giorno fa',
  },
];

const VideoDetailScreen: React.FC<Props> = ({ route }) => {
  const { video } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(123);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const renderComment = (comment: typeof MOCK_COMMENTS[0]) => (
    <View key={comment.id} style={styles.commentItem}>
      <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{comment.author}</Text>
          <Text style={styles.commentTime}>{comment.time}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={globalStyles.screen} showsVerticalScrollIndicator={false}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.videoPlayer} />
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={32} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Video Info */}
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{video.title}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.uploaderInfo}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/40?img=5' }} 
              style={styles.uploaderAvatar}
            />
            <View>
              <Text style={styles.uploaderName}>👤 {video.uploader}</Text>
              <Text style={styles.videoGroup}>🎯 Gruppo: {video.group}</Text>
            </View>
          </View>
          
          <Text style={styles.uploadTime}>Caricato 2 giorni fa</Text>
        </View>

        <Text style={styles.description}>{video.description}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, isLiked && styles.actionButtonLiked]}
          onPress={handleLike}
        >
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={24} 
            color={isLiked ? colors.white : colors.primary}
          />
          <Text style={[
            styles.actionText, 
            isLiked && styles.actionTextLiked
          ]}>
            {likeCount} Mi piace
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color={colors.primary} />
          <Text style={styles.actionText}>Condividi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={24} color={colors.primary} />
          <Text style={styles.actionText}>Salva</Text>
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        <View style={styles.commentsHeader}>
          <Text style={styles.commentsTitle}>💬 Commenti</Text>
          <Text style={styles.commentsCount}>{MOCK_COMMENTS.length}</Text>
        </View>

        {MOCK_COMMENTS.map(renderComment)}

        <TouchableOpacity style={styles.addCommentButton}>
          <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.addCommentText}>Aggiungi un commento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  videoPlayer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#eeeeee',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 26,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#eeeeee',
  },
  uploaderName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  videoGroup: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  uploadTime: {
    fontSize: 12,
    color: colors.textLight,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  actionButtonLiked: {
    backgroundColor: colors.primary,
  },
  actionText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '500',
  },
  actionTextLiked: {
    color: colors.white,
  },
  commentsSection: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  commentsCount: {
    fontSize: 14,
    color: colors.textSecondary,
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#eeeeee',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  commentTime: {
    fontSize: 12,
    color: colors.textLight,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 18,
  },
  addCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 8,
  },
  addCommentText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default VideoDetailScreen;