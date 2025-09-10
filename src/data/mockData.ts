export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  price: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  content?: string;
  videoUrl?: string;
  order: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete React Developer Course',
    description: 'Master React from scratch with hooks, context, and modern practices. Build real-world projects and deploy to production.',
    instructor: 'Sarah Chen',
    instructorAvatar: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Web Development',
    rating: 4.8,
    students: 15420,
    duration: '12 hours',
    level: 'Intermediate',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 89.99,
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to React',
        duration: '15 min',
        type: 'video',
        content: 'Welcome to the Complete React Developer Course! In this lesson, we\'ll explore what React is and why it\'s so popular.',
        order: 1
      },
      {
        id: '1-2',
        title: 'Setting Up Your Environment',
        duration: '20 min',
        type: 'video',
        content: 'Learn how to set up your development environment with Node.js, npm, and create-react-app.',
        order: 2
      },
      {
        id: '1-3',
        title: 'React Fundamentals Quiz',
        duration: '10 min',
        type: 'quiz',
        order: 3
      }
    ]
  },
  {
    id: '2',
    title: 'UI/UX Design Masterclass',
    description: 'Learn the principles of great design, user research, prototyping, and create stunning user interfaces.',
    instructor: 'Michael Torres',
    instructorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Design',
    rating: 4.9,
    students: 8730,
    duration: '8 hours',
    level: 'Beginner',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 69.99,
    lessons: [
      {
        id: '2-1',
        title: 'Design Thinking Process',
        duration: '18 min',
        type: 'video',
        content: 'Understand the human-centered design process and how to approach design challenges.',
        order: 1
      },
      {
        id: '2-2',
        title: 'Color Theory & Typography',
        duration: '25 min',
        type: 'video',
        content: 'Master the fundamentals of color theory and typography to create visually appealing designs.',
        order: 2
      }
    ]
  },
  {
    id: '3',
    title: 'Machine Learning with Python',
    description: 'Dive into machine learning with Python. Learn algorithms, data preprocessing, and build predictive models.',
    instructor: 'Dr. Emily Watson',
    instructorAvatar: 'https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'AI & Machine Learning',
    rating: 4.7,
    students: 12580,
    duration: '16 hours',
    level: 'Advanced',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 129.99,
    lessons: [
      {
        id: '3-1',
        title: 'Introduction to Machine Learning',
        duration: '22 min',
        type: 'video',
        content: 'Explore the fundamentals of machine learning and its applications in real-world scenarios.',
        order: 1
      }
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Master digital marketing with SEO, social media, content marketing, and analytics to grow your business.',
    instructor: 'James Rodriguez',
    instructorAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    category: 'Marketing',
    rating: 4.6,
    students: 9240,
    duration: '10 hours',
    level: 'Intermediate',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
    price: 79.99,
    lessons: [
      {
        id: '4-1',
        title: 'Digital Marketing Fundamentals',
        duration: '20 min',
        type: 'video',
        content: 'Learn the basics of digital marketing and how it differs from traditional marketing.',
        order: 1
      }
    ]
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1',
    lessonId: '1-3',
    title: 'React Fundamentals Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What is React?',
        options: [
          'A database management system',
          'A JavaScript library for building user interfaces',
          'A server-side programming language',
          'A CSS framework'
        ],
        correctAnswer: 1,
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces, particularly for web applications.'
      },
      {
        id: 'q2',
        question: 'What is JSX?',
        options: [
          'A CSS preprocessor',
          'A JavaScript extension that allows writing HTML-like syntax',
          'A database query language',
          'A testing framework'
        ],
        correctAnswer: 1,
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript, making React components more readable.'
      },
      {
        id: 'q3',
        question: 'Which hook is used for managing state in functional components?',
        options: [
          'useEffect',
          'useState',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1,
        explanation: 'useState is the React hook used for adding and managing state in functional components.'
      }
    ]
  }
];