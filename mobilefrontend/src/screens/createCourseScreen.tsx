import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';
import Input from '../components/inputFeild';
import { createCourse } from '../api/apiCall';

const CreateCourseScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const handleCreate = async () => {
    try {
      await createCourse(title, description, content);
      Alert.alert('Success', 'Course created!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create course');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Course</Text>
      <Input value={title} onChangeText={setTitle} placeholder="Title" />
      <Input value={description} onChangeText={setDescription} placeholder="Description" />
      <Input value={content} onChangeText={setContent} placeholder="Content" />
      <Button title="Create" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default CreateCourseScreen;