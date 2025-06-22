import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthResponse, Course, GPTResponse } from '../types/types';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add JWT to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//user api
// export const register = (username: string, password: string, role: string) =>
//   api.post<AuthResponse>('/api/users/register', { username, password, role });
// export const register = (
//   username: string,
//   email: string,
//   password: string,
//   role: 'student' | 'instructor'
// ) => api.post<AuthResponse>('/api/users/register', { username, email, password, role });

export const register = async (
  username: string,
  email: string,
  password: string,
  role: 'student' | 'instructor'
) => {
  try {
    console.log('Registering:', { username, email, role });

    const response = await api.post<AuthResponse>('http://localhost:3030/api/users/register', {
      username,
      email,
      password,
      role
    });

    console.log('Registration success - Status:', response.status);
    console.log('Response data:', {
      token: response.data.token,
      userId: response.data.user.id
    });

    return response;

  } catch (error: any) {
    console.error('Registration failed -:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method
      }
    });
    throw error;
  }
};

export const login = (username: string, password: string) =>
  api.post<AuthResponse>('/api/users/login', { username, password });

// export const getUser = () => api.get

export const getCourses = () => api.get<Course[]>('/api/courses');

export const getMyCourses = () => api.get<Course[]>('/api/courses/my-courses');

export const getEnrolledCourses = () => api.get<Course[]>('/api/courses/enrolled');

export const enrollCourse = (id: string) => api.post(`/api/courses/${id}/enroll`);

export const createCourse = (title: string, description: string, content: string) =>
  api.post<Course>('/api/courses', { title, description, content });

export const updateCourse = (id: string, title: string, description: string, content: string) =>
  api.put<Course>(`/api/courses/${id}`, { title, description, content });

export const deleteCourse = (id: string) => api.delete(`/api/courses/${id}`);

export const getCourseRecommendations = (prompt: string) =>
  api.post<GPTResponse>('/api/gpt/recommend', { prompt });