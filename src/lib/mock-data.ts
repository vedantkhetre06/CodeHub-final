import { User, Test, Assignment, Subject, Resource, Submission } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'John Admin', email: 'admin@codehub.edu', role: 'admin' },
  { id: '2', name: 'Dr. Sarah Smith', email: 'sarah@codehub.edu', role: 'teacher' },
  { id: '3', name: 'Alex Student', email: 'alex@codehub.edu', role: 'student', branch: 'CS', section: 'A', year: '3rd', github: 'https://github.com/alex' },
  { id: '4', name: 'Emily Student', email: 'emily@codehub.edu', role: 'student', branch: 'IT', section: 'B', year: '2nd' },
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 's1', name: 'Data Structures and Algorithms', code: 'DSA101' },
  { id: 's2', name: 'Database Management Systems', code: 'DBMS202' },
  { id: 's3', name: 'Computer Architecture', code: 'CA303' },
];

export const MOCK_TESTS: Test[] = [
  {
    id: 't1',
    title: 'Midterm DSA Assessment',
    description: 'Covers Linked Lists, Stacks, and Queues.',
    subject: 'Data Structures and Algorithms',
    timeLimit: 45,
    createdBy: '2',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        text: 'What is the time complexity of searching in a balanced BST?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
        explanation: 'Balanced Binary Search Trees provide logarithmic time for operations.'
      },
      {
        id: 'q2',
        type: 'coding',
        text: 'Write a function that reverses a linked list.',
        language: 'javascript',
        boilerplate: 'function reverseList(head) {\n  // your code here\n}',
        testCases: [
          { input: '[1,2,3]', output: '[3,2,1]' }
        ]
      }
    ]
  }
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Normalization Exercise',
    description: 'Perform 1NF, 2NF, and 3NF on the provided schema.',
    subject: 'Database Management Systems',
    dueDate: '2024-06-20',
    createdBy: '2'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  { id: 'r1', title: 'DSA Complete Notes', type: 'pdf', url: '#', subject: 'Data Structures and Algorithms', uploadedBy: '2' },
  { id: 'r2', title: 'DBMS Cheat Sheet', type: 'link', url: 'https://google.com', subject: 'Database Management Systems', uploadedBy: '2' },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  { id: 'sub1', testId: 't1', studentId: '3', studentName: 'Alex Student', score: 85, submittedAt: '2024-05-01', status: 'submitted' },
  { id: 'sub2', assignmentId: 'a1', studentId: '3', studentName: 'Alex Student', submittedAt: '2024-05-05', status: 'submitted' },
];