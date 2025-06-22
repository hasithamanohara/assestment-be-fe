import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';
import { getEnrolledCourses } from '../api/apiCall';
import { Course } from '../types/types';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CourseDetail'>;

const EnrolledCoursesScreen: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getEnrolledCourses();
        setCourses(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch enrolled courses');
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
      <Text style={styles.title}>My Enrolled Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
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

export default EnrolledCoursesScreen;