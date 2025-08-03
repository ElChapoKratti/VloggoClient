import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useVideoContext } from '../context/VideoContext';
import { globalStyles, colors } from '../styles/globalStyles';

const GROUPS = ['Amici', 'Famiglia', 'Colleghi', 'Pubblico', 'Lavoro'];

const UploadScreen: React.FC = () => {
  const { addVideo } = useVideoContext();
  const navigation = useNavigation();
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const pickVideo = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert(
        'Permesso negato', 
        'È necessario il permesso per accedere alla galleria'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    quality: 1,
    videoMaxDuration: 30,
  });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setVideoUri(null);
    setTitle('');
    setDescription('');
    setSelectedGroup(null);
  };

  const upload = () => {
    if (!videoUri || !title.trim() || !description.trim() || !selectedGroup) {
      Alert.alert('Errore', 'Compila tutti i campi e seleziona un video');
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      uri: videoUri,
      group: selectedGroup,
      uploader: 'Luca Rossi',
      thumbnail: `https://picsum.photos/400/200?random=${Date.now()}`,
    };

    addVideo(newVideo);
    resetForm();

    Alert.alert(
      'Successo', 
      'Video caricato con successo!', 
      [
        {
          text: 'Vai al Profilo',
          onPress: () => navigation.navigate('Profile' as never),
        },
        {
          text: 'Carica altro',
          style: 'cancel',
        },
      ]
    );
  };

  const isFormValid = videoUri && title.trim() && description.trim() && selectedGroup;

  return (
    <ScrollView style={globalStyles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Carica Video</Text>
        <Text style={styles.headerSubtitle}>
          Condividi i tuoi momenti speciali
        </Text>
      </View>

      <TouchableOpacity style={styles.videoPicker} onPress={pickVideo}>
        <Ionicons 
          name={videoUri ? 'checkmark-circle' : 'cloud-upload-outline'} 
          size={24} 
          color={colors.white}
          style={styles.pickerIcon}
        />
        <Text style={styles.pickerText}>
          {videoUri ? '🎬 Video selezionato' : 'Scegli video dalla galleria'}
        </Text>
      </TouchableOpacity>

      <TextInput 
        placeholder="Titolo del video (es. La mia vacanza a Roma)" 
        style={globalStyles.input} 
        value={title} 
        onChangeText={setTitle}
        maxLength={100}
      />
      
      <TextInput
        placeholder="Descrizione del video..."
        style={[globalStyles.input, styles.descriptionInput]}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
        maxLength={500}
      />

      <Text style={styles.label}>👥 Seleziona gruppo di condivisione:</Text>
      <View style={styles.groupContainer}>
        {GROUPS.map((group) => (
          <TouchableOpacity
            key={group}
            onPress={() => setSelectedGroup(group)}
            style={[
              styles.groupOption,
              selectedGroup === group && styles.groupOptionSelected,
            ]}
          >
            <Text style={[
              styles.groupOptionText,
              selectedGroup === group && styles.groupOptionTextSelected
            ]}>
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={[
          styles.uploadButton, 
          !isFormValid && styles.uploadButtonDisabled
        ]}
        onPress={upload}
        disabled={!isFormValid}
      >
        <Ionicons 
          name="cloud-upload" 
          size={20} 
          color={colors.white}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadButtonText}>Carica Video</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          💡 Suggerimento: I video vengono condivisi solo con il gruppo selezionato
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
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
  videoPicker: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerIcon: {
    marginRight: 10,
  },
  pickerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionInput: {
    height: 100,
    paddingTop: 15,
  },
  label: {
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 16,
    color: colors.text,
  },
  groupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  groupOption: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.border,
  },
  groupOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  groupOptionText: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 14,
  },
  groupOptionTextSelected: {
    color: colors.white,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  uploadIcon: {
    marginRight: 8,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default UploadScreen;