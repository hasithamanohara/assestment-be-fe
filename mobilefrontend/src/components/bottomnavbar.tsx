import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseListScreen from '../screens/courseListScreen';
import ChatGPTScreen from '../screens/gptScreen';
import ProfileScreen from '../screens/profileScren';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
      return (
            <Tab.Navigator
                  screenOptions={{
                        tabBarActiveTintColor: '#007AFF',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: {
                              paddingBottom: 5,
                              height: 60,
                        },
                  }}
            >
                  <Tab.Screen
                        name="Courses"
                        component={CourseListScreen}
                        options={{
                              tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="book" color={color} size={size} />
                              ),
                              headerShown: false,
                        }}
                  />
                  <Tab.Screen
                        name="GPT"
                        component={ChatGPTScreen}
                        options={{
                              tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="chatbubbles" color={color} size={size} />
                              ),
                              headerShown: false,
                        }}
                  />
                  <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                              tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="person" color={color} size={size} />
                              ),
                              headerShown: false,
                        }}
                  />
            </Tab.Navigator>
      );
};