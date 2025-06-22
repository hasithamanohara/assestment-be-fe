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
  Main: undefined;
  ChatGPT: undefined;
  Splash: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type BottomTabParamList = {
  Courses: undefined;
  GPT: undefined;
  Profile: undefined;
};
