import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../context/authContext';
import { getToken } from '../utils/storage';
import { jwtDecode } from 'jwt-decode';
import { RootStackParamList } from '../types/navigation';
import { User } from '../types/types';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkAuth = async () => {
        try {
          const token = await getToken();
          if (token) {
            const decoded = jwtDecode<User>(token);
            setUser({
              id: decoded.id || '',
              username: decoded.username || '',
              role: decoded.role || '',
              email: decoded.email || ''
            });
            navigation.replace('Main');
          } else {
            navigation.replace('Login');
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          navigation.replace('Login');
        }
      };
      checkAuth();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigation, setUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I Learn</Text>
      
      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color="#FFFFFF" 
          style={styles.loader}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50, 
    alignItems: 'center',
  },
  loader: {
    marginBottom: 10,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SplashScreen;