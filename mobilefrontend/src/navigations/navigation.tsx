// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import React, { useContext } from 'react';
// import { AuthContext } from '../context/authContext';
// import { RootStackParamList } from '../types/navigation';
// import SplashScreen from '../screens/splashscreen';
// import SignUpScreen from '../screens/signUpScreen';
// import LoginScreen from '../screens/signInScreen';
// import CreateCourseScreen from '../screens/createCourseScreen';
// import EditCourseScreen from '../screens/updateCouresScreen';
// import CourseDetailScreen from '../screens/courseDetailsScreen';
// import CourseListScreen from '../screens/courseListScreen';
// import EnrolledCoursesScreen from '../screens/enrolledCourseScreen';
// import InstructorCoursesScreen from '../screens/instructorCourseScreen';
// import ChatGPTScreen from '../screens/gptScreen';

// const Stack = createStackNavigator<RootStackParamList>();

// const AppNavigator: React.FC = () => {
//   const { user, isLoading } = useContext(AuthContext);

//   if (isLoading) {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Splash" component={SplashScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {!user ? (
//           <>
//             <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
//             <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
//           </>
//         ) : (
//           <>
//             <Stack.Screen name="CourseList" component={CourseListScreen} options={{ title: 'Courses' }} />
//             <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course Details' }} />
//             <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} options={{ title: 'My Enrolled Courses' }} />
//             {user.role === 'instructor' && (
//               <>
//                 <Stack.Screen name="InstructorCourses" component={InstructorCoursesScreen} options={{ title: 'My Courses' }} />
//                 <Stack.Screen name="CreateCourse" component={CreateCourseScreen} options={{ title: 'Create Course' }} />
//                 <Stack.Screen name="EditCourse" component={EditCourseScreen} options={{ title: 'Edit Course' }} />
//               </>
//             )}
//             {user.role === 'student' && (
//               <Stack.Screen name="ChatGPT" component={ChatGPTScreen} options={{ title: 'Course Recommendations' }} />
//             )}
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { RootStackParamList } from '../types/navigation';
import SplashScreen from '../screens/splashscreen';
import SignUpScreen from '../screens/signUpScreen';
import LoginScreen from '../screens/signInScreen';
import CreateCourseScreen from '../screens/createCourseScreen';
import EditCourseScreen from '../screens/updateCouresScreen';
import CourseDetailScreen from '../screens/courseDetailsScreen';
import EnrolledCoursesScreen from '../screens/enrolledCourseScreen';
import InstructorCoursesScreen from '../screens/instructorCourseScreen';
import { BottomTabNavigator } from '../components/bottomnavbar';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title: 'Course Details' }} />
            <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} options={{ title: 'My Enrolled Courses' }} />
            {user.role === 'instructor' && (
              <>
                <Stack.Screen name="InstructorCourses" component={InstructorCoursesScreen} options={{ title: 'My Courses' }} />
                <Stack.Screen name="CreateCourse" component={CreateCourseScreen} options={{ title: 'Create Course' }} />
                <Stack.Screen name="EditCourse" component={EditCourseScreen} options={{ title: 'Edit Course' }} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;