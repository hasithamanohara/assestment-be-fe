import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';
import Input from '../components/inputFeild';
import { updateCourse } from '../api/apiCall';
import { Course } from '../types/types';

const EditCourseScreen: React.FC<{ route: { params: { course: Course } } }> = ({ route }) => {
  const { course } = route.params;
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [content, setContent] = useState(course.content || '');
  const navigation = useNavigation();

  const handleUpdate = async () => {
    try {
      await updateCourse(course._id, title, description, content);
      Alert.alert('Success', 'Course updated!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update course');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Course</Text>
      <Input value={title} onChangeText={setTitle} placeholder="Title" />
      <Input value={description} onChangeText={setDescription} placeholder="Description" />
      <Input value={content} onChangeText={setContent} placeholder="Content" />
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default EditCourseScreen;