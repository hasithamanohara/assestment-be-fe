import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';
import { getCourses } from '../api/apiCall';
import { Course } from '../types/types';
import { AuthContext } from '../context/authContext';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CourseDetail'>;

const CourseListScreen: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  const renderCourse = ({ item }: { item: Course }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('CourseDetail', { course: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
      {user?.role === 'student' && (
        <>
          <Button
            title="My Enrolled Courses"
            onPress={() => navigation.navigate('EnrolledCourses')}
          />
          <Button
            title="Get Recommendations"
            onPress={() => navigation.navigate('ChatGPT')}
          />
        </>
      )}
      {user?.role === 'instructor' && (
        <>
          <Button
            title="My Courses"
            onPress={() => navigation.navigate('InstructorCourses')}
          />
          <Button
            title="Create Course"
            onPress={() => navigation.navigate('CreateCourse')}
          />
        </>
      )}
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  list: { paddingBottom: 16 },
  courseItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  courseTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default CourseListScreen;