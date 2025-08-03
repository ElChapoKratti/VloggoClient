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
import { useVideoContext } from '../context/VideoContext';
import { RootStackParamList, Video } from '../types';
import { globalStyles, colors } from '../styles/globalStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const { videos } = useVideoContext();
  const navigation = useNavigation<NavigationProp>();

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() => navigation.navigate('VideoDetail', { video: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={globalStyles.thumbnail} />
      <Text style={globalStyles.videoTitle}>{item.title}</Text>
      <Text style={globalStyles.meta}>
        👤 {item.uploader} · 🎯 {item.group}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={globalStyles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎬</Text>
      <Text style={globalStyles.emptyText}>Nessun video caricato</Text>
      <Text style={globalStyles.emptySubText}>
        I video caricati dagli utenti appariranno qui.{'\n'}
        Inizia caricando il tuo primo video!
      </Text>
    </View>
  );

  return (
    <View style={globalStyles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed Video</Text>
        <Text style={styles.headerSubtitle}>
          {videos.length} video{videos.length !== 1 ? 's' : ''} disponibili
        </Text>
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={videos.length === 0 ? { flex: 1 } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    lineHeight: 18,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
});

export default HomeScreen;