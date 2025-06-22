import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/button';
import { enrollCourse } from '../api/apiCall';
import { Course } from '../types/types';
import { AuthContext } from '../context/authContext';

const CourseDetailScreen: React.FC<{ route: { params: { course: Course } } }> = ({ route }) => {
  const { course } = route.params;
  const { user } = useContext(AuthContext);

  const handleEnroll = async () => {
    try {
      await enrollCourse(course._id);
      Alert.alert('Success', 'Enrollment successful!');
    } catch (error) {
      Alert.alert('Error', 'Enrollment failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text>{course.description}</Text>
      <Text style={styles.label}>Instructor:</Text>
      <Text>{course.instructor.username}</Text>
      {course.content && (
        <>
          <Text style={styles.label}>Content:</Text>
          <Text>{course.content}</Text>
        </>
      )}
      {user?.role === 'student' && <Button title="Enroll" onPress={handleEnroll} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
});

export default CourseDetailScreen;