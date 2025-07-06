Online Learning Mobile App with ChatGPT Integration

📚 Project Overview
This is an online learning mobile application developed using the MERN stack (MongoDB, Express.js, React Native with TypeScript, Node.js). The app enables users to register, log in, enroll in courses, and receive personalized course recommendations via GPT-3 integration. Instructors can create and manage courses, and students can view and enroll in courses. The application is cloud-hosted and accessible online.

✨ Features
👩‍🎓 Student Features

Sign Up and Login: Register and log in with a username and password.
Course Viewing and Enrollment: Browse available courses, view details, and enroll.
Enrolled Courses: View a list of enrolled courses.
ChatGPT Course Suggestions: Submit prompts (e.g., "I want to be a software engineer, what courses should I follow?") to get personalized course recommendations.

👨‍🏫 Instructor Features

Sign Up and Login: Register and log in with a username and password.
Course Management: Create, view, edit, and delete courses.
Student Details: View a table of enrolled students for each course.


🛠️ Tech Stack



Component
Technology



Backend
Node.js, Express.js, MongoDB


Frontend
React Native, TypeScript


Authentication
JWT-based authentication


AI Integration
GPT-3 API for recommendations


Version Control
Git (GitHub)


Hosting
Cloud service (e.g., AWS, Heroku)



📋 Prerequisites

Node.js: v16 or higher
MongoDB: Local or cloud instance (e.g., MongoDB Atlas)
Git: For version control
GPT-3 API Key: Refer to provided instructions
Yarn or npm: Package management
React Native CLI: For mobile development


🚀 Installation and Setup
Backend Setup

Clone the repository:git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>/backend


Install dependencies:npm install


Create a .env file in the backend directory:MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
GPT3_API_KEY=<your-gpt3-api-key>
PORT=5000


Start the backend server:npm start



Frontend Setup

Navigate to the frontend directory:cd <repository-name>/frontend


Install dependencies:npm install


Configure the API base URL in src/config.ts:export const API_URL = 'http://localhost:5000/api';


Start the React Native development server:npm start


Run the app:
iOS:npm run ios


Android:npm run android





Running Locally

Ensure MongoDB is running.
Start the backend server.
Run the frontend app on a simulator or device.


📂 Project Structure
<repository-name>/
├── backend/

│   ├── config/           # Database and configuration

│   ├── controllers/      # API route handlers

│   ├── models/           # MongoDB schemas (User, Course)

│   ├── routes/           # API routes

│   ├── middleware/       # Authentication and error handling

│   ├── .env              # Environment variables

│   ├── server.js         # Backend entry point

│   └── package.json


├── frontend/

│   ├── src/

│   │   ├── components/   # Reusable React Native components

│   │   ├── screens/      # App screens (Login, CourseList)

│   │   ├── api/          # API call functions

│   │   ├── types/        # TypeScript type definitions

│   │   ├── App.tsx       # App entry point

│   │   └── config.ts     # Configuration (API URL)

│   ├── package.json

│   └── metro.config.js

├── docs/                 # Project documentation

└── README.md


🌐 API Endpoints

User Authentication


POST /api/auth/register: Register a new user (student or instructor).
POST /api/auth/login: Log in and receive a JWT token.


Course Management


POST /api/courses: Create a course (instructor only).
GET /api/courses: List all courses.
GET /api/courses/:id: View course details.
PUT /api/courses/:id: Update a course (instructor only).
DELETE /api/courses/:id: Delete a course (instructor only).
POST /api/courses/:id/enroll: Enroll in a course (student only).
GET /api/courses/enrolled: List enrolled courses (student only).
GET /api/courses/:id/students: View enrolled students (instructor only).


GPT-3 Integration


POST /api/recommendations: Submit a prompt for course recommendations.


🤖 GPT-3 Integration

The GPT-3 API generates course recommendations based on user prompts.
Example: "I want to be a software engineer, what courses should I follow?"
The backend queries GPT-3 and matches recommendations with available courses.


☁️ Deployment

Deploy the backend to a cloud platform (e.g., Heroku, AWS).
Build and distribute the frontend as a mobile app (APK for Android, IPA for iOS).
Configure environment variables on the cloud platform.
Update the frontend's API URL to the deployed backend.


📖 Documentation
Find detailed documentation in the docs/ directory:

System architecture
Database schema
API documentation
Setup and deployment instructions


🗂️ Version Control

Hosted on GitHub.
Use Git for version control.
Commit changes with descriptive messages.
Create feature/bugfix branches and merge via pull requests.


✅ Evaluation Criteria

Technical Skills: MERN stack, TypeScript, GPT-3 integration.
Problem-Solving: Effective solutions for authentication and recommendations.
Code Quality: Clean, documented code.
System Design: Scalable architecture.
Project Management: Timely delivery.
Communication: Clear documentation and demo.


📦 Deliverables

Source code on GitHub.
Locally runnable application.
Documentation in docs/.
Demo showcasing key features.


📬 Contact
For questions, reach out via email or the provided communication channel.
