import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { globalStyles, colors } from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      navigation.replace('Main');
    } else {
      Alert.alert('Errore', 'Inserisci username e password');
    }
  };

  return (
    <View style={globalStyles.centered}>
      <Text style={globalStyles.title}>Vloggo</Text>
      <Text style={styles.subtitle}>Benvenuto nella tua app di video sharing!</Text>
      
      <TextInput
        placeholder="Nome utente"
        style={globalStyles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Accedi" onPress={handleLogin} color={colors.primary} />
      </View>
      
      <Text style={styles.helpText}>
        Inserisci qualsiasi username e password per continuare
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  helpText: {
    fontSize: 12,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default LoginScreen;