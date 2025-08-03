import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { VideoProvider } from './src/context/VideoContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <VideoProvider>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="#FF5C5C" />
      </VideoProvider>
    </SafeAreaProvider>
  );
}