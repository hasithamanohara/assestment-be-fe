import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { login } from '../api/apiCall';
import Button from '../components/button';
import Input from '../components/inputFeild';
import { AuthContext } from '../context/authContext';
import { RootStackParamList } from '../types/navigation';
import { saveToken } from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      await saveToken(response.data.token);
      setUser(response.data.user);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input value={username} onChangeText={setUsername} placeholder="Username" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default LoginScreen;