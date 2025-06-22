import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthResponse, Course, GPTResponse } from '../types/types';

const api = axios.create({
  baseURL: 'https://online-learning-api-2t3k.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// Add JWT token to all requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
export const register = async (
  username: string,
  email: string,
  password: string,
  role: 'student' | 'instructor'
) => {
  try {
    console.log('Registering:', { username, email, role });

    const response = await api.post<AuthResponse>('/api/users/register', {
      username,
      email,
      password,
      role,
    });

    console.log('Registration success - Status:', response.status);
    console.log('Response data:', {
      token: response.data.token,
      userId: response.data.user.id,
    });

    return response;
  } catch (error: any) {
    console.error('Registration failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      },
    });
    throw error;
  }
};

// Login
export const login = (username: string, password: string) =>
  api.post<AuthResponse>('/api/users/login', { username, password });


//get user by id
export const getUserByID = (userId: string) =>
  api.post<AuthResponse>('/api/users/getUser', {userId});

//update user data
export const updateUserData = (username: String, email: String, password:String ) =>
  api.post<AuthResponse>('/api/users/update', {username,email,password});

//delete user
export const deleteUser = (userId: string) => {
  console.log('Deleting user', userId);
  return api.delete('/api/users/delete');
};


  // Create a course instructor
export const createCourse = async (
  title: string,
  description: string,
  content: string
): Promise<Course> => {
  try {
    const response = await api.post<Course>('api/course/createCourse', {
      title,
      description,
      content,
    });
    return response.data;
  } catch (error: any) {
    console.error('Create course failed:', {
      status: error.response?.status || 'No response',
      message: error.response?.data?.message || error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
      },
    });
    throw error;
  }
};

// Enroll in a course student
  export const enrollCourse = async (id: string): Promise<void> => {
    try {
      await api.post(`/api/course/${id}/enroll`);
    } catch (error: any) {
      console.error('Enroll course failed:', {
        status: error.response?.status || 'No response',
        message: error.response?.data?.message || error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        },
      });
      throw error;
    }
  };

  // Update existing course instructor
  export const updateCourse = async (
    id: string,
    title: string,
    description: string,
    content: string
  ): Promise<Course> => {
    try {
      const response = await api.put<Course>(`/api/course/${id}`, {
        title,
        description,
        content,
      });
      return response.data;
    } catch (error: any) {
      console.error('Update course failed:', {
        status: error.response?.status || 'No response',
        message: error.response?.data?.message || error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        },
      });
      throw error;
    }
  };

  // Get all courses
  export const getCourses = async () => {
    try {
      console.log('Fetching all courses...');
      const response = await api.get<Course[]>('/api/course/getAllCourese');
      console.log('all courses fetched:', response.data);
      return response;

    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

  // student get  enrolled course
  export const getMyCourses = async () => {
    try {
      console.log('Fetching my courses...');
      const response = await api.get<Course[]>('/api/course/enrolled');
      console.log('My courses fetched:', response.data);
      return response;
    } catch (error: any) {
      console.error('Registration failed:', {
        status: error.response?.status || 'No response',
        message: error.response?.data?.message || error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        },
      });
      throw error;
    }

  };


  // instructor get my course
  export const getEnrolledCourses = () => api.get<Course[]>('/api/course/getmycourses');

  // Delete a course
  export const deleteCourse = async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/course/${id}`);
    } catch (error: any) {
      console.error('Delete course failed:', {
        status: error.response?.status || 'No response',
        message: error.response?.data?.message || error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        },
      });
      throw error;
    }
  };


  //gpt course recommendations
  export const getCourseRecommendations = async (prompt: string): Promise<GPTResponse> => {
    try {
      const response = await api.post<GPTResponse>('/api/gpt/recommend', { prompt });
      return response.data;
    } catch (error: any) {
      console.error('GPT recommendations failed:', {
        status: error.response?.status || 'No response',
        message: error.response?.data?.message || error.message,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        },
      });
      throw error;
    }
  };
