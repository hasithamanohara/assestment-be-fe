import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { register } from '../api/apiCall';
import Button from '../components/button';
import Input from '../components/inputFeild';
import { AuthContext } from '../context/authContext';
import { RootStackParamList } from '../types/navigation';
import { saveToken } from '../utils/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const navigation = useNavigation<NavigationProp>();
  const { setUser } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {
      username: username.trim() ? '' : 'Username is required',
      email: /^\S+@\S+\.\S+$/.test(email) ? '' : 'Valid email is required',
      password: password.length >= 6 ? '' : 'Password must be at least 6 characters',
      role: role ? '' : 'Role is required'
      
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    console.log("*");
    setLoading(true);
    try {
      console.log("***");
      const response = await register(username, email, password, role);
      console.log(response);
      console.log("****");
      await saveToken(response.data.token);
      setUser(response.data.user);
      Alert.alert(
        'Registration Successful',
        'You can now login to your account',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
      // navigation.navigate('Login');
      // setUser({ id: '', username, role });
    } catch (error: any) {
      let errorMessage = 'Registration failed';
      if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors)
          .flat()
          .join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert('Registration Error', errorMessage);

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Input value={username} onChangeText={setUsername} placeholder="Username" />
      <Input value={email} onChangeText={setEmail} placeholder="email" />
      <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
          dropdownIconColor="#333"
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Instructor" value="instructor" />
        </Picker>
        {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}
      </View>
      {/* <Picker selectedValue={role} onValueChange={setRole} style={styles.picker}>
        <Picker.Item label="Student" value="student" />
        <Picker.Item label="Instructor" value="instructor" />
      </Picker> */}
      <Button
        title={loading ? "Registering..." : "Sign Up"}
        onPress={handleSignUp}
      />
      {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  pickerContainer: { marginVertical: 8 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginVertical: 8, backgroundColor: '#fff' },
  label: {
    marginBottom: 4,
    color: '#333',
    fontWeight: '500'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  }
});

export default SignUpScreen;