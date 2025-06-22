import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/button';
import { getCourses, getMyCourses } from '../api/apiCall';
import { Course } from '../types/types';
import { AuthContext } from '../context/authContext';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CourseDetail'>;

const AllCoursesScreen: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [showAll, setShowAll] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { user } = useContext(AuthContext);

  const fetchCourses = async () => {
    try {
      console.log("**");
      const response = await getMyCourses();
      console.log("***");
      setCourses(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch courses');
    }
  };
  const getAllCourses = async () => {
    try {
      console.log("**");
      const response = await getCourses();
      console.log("***");
      setAllCourses(response.data);
    setShowAll(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch courses');
    }
  };

  useEffect(() => {
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
      <Text style={styles.title}>Acadamic</Text>
      {user?.role === 'student' && (
        <Button
          title="My Enrolled Courses"
          onPress={() => navigation.navigate('EnrolledCourses')}
        />
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

      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />

      <Button title="Show All Courses" onPress={getAllCourses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  list: { paddingBottom: 16 },
  courseItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  courseTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
});

export default AllCoursesScreen;
