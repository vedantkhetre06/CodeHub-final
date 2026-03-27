export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  github?: string;
  leetcode?: string;
  branch?: string;
  section?: string;
  year?: string;
}

export type QuestionType = 'mcq' | 'coding';

export interface MCQQuestion {
  id: string;
  type: 'mcq';
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  output: string;
}

export interface CodingQuestion {
  id: string;
  type: 'coding';
  text: string;
  language: string;
  boilerplate: string;
  testCases: TestCase[];
}

export type Question = MCQQuestion | CodingQuestion;

export interface Test {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'objective' | 'editor';
  timeLimit: number; // in minutes
  questions: Question[];
  createdBy: string; // teacher id
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  createdBy: string;
}

export interface Submission {
  id: string;
  testId?: string;
  assignmentId?: string;
  studentId: string;
  studentName: string;
  answers?: Record<string, string>; // questionId -> answer
  score?: number;
  submittedAt: string;
  status: 'submitted' | 'not-submitted';
  cheatingDetected?: boolean;
  feedback?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link';
  url: string;
  subject: string;
  unit?: string;
  uploadedBy: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}
