export interface User {
  id: string;
  username: string;
  email:string;
  role: 'student' | 'instructor';
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: { _id: string; username: string };
  content?: string;
  students?: string[];
}

export interface AuthResponse {
   user: {
    id: string;
    username: string;
    email: string;
    role: 'student' | 'instructor';
  };
  token: string;
}

export interface GPTResponse {
  data(data: any): unknown;
  recommendations: string;
}