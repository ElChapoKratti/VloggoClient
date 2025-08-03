import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoProvider } from '@/context/VideoContext';

export default function RootLayout() {
  return (
    <VideoProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </VideoProvider>
  );
}
