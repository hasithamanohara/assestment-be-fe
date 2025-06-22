import { Course } from "./types";

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  CourseList: undefined;
  EditCourse: { course: Course }
  CourseDetail: { course: Course }
  EnrolledCourses: undefined;
  InstructorCourses: undefined;
  CreateCourse: undefined;
  ChatGPT: undefined;
};
