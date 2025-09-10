import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { courses, quizzes } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import Quiz from '../components/Quiz';

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, markLessonComplete, markQuizComplete } = useAuth();
  const [quizCompleted, setQuizCompleted] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const currentIndex = course?.lessons.findIndex(l => l.id === lessonId) || 0;
  const nextLesson = course?.lessons[currentIndex + 1];
  const previousLesson = course?.lessons[currentIndex - 1];

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <button
            onClick={() => navigate('/courses')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = user?.completedLessons.includes(lesson.id);
  const quiz = lesson.type === 'quiz' ? quizzes.find(q => q.lessonId === lesson.id) : null;

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
  };

  const handleQuizComplete = (score: number) => {
    markQuizComplete(`quiz-${lesson.id}`);
    markLessonComplete(lesson.id);
    setQuizCompleted(true);
  };

  const handleNavigation = (targetLesson: any) => {
    navigate(`/lesson/${courseId}/${targetLesson.id}`);
  };

  if (lesson.type === 'quiz' && quiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/course/${courseId}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to course</span>
          </motion.button>

          <Quiz quiz={quiz} onComplete={handleQuizComplete} />

          {(quizCompleted || isCompleted) && nextLesson && (
            <div className="mt-8 text-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation(nextLesson)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto"
              >
                <span>Next: {nextLesson.title}</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(`/course/${courseId}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to course</span>
        </motion.button>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Video/Content Area */}
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">Video Content</p>
                  <p className="text-blue-100">Duration: {lesson.duration}</p>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                    <p className="text-gray-600">
                      Lesson {currentIndex + 1} of {course.lessons.length} • {lesson.duration}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-6 w-6" />
                      <span className="font-medium">Completed</span>
                    </div>
                  )}
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {lesson.content}
                  </p>
                </div>

                {!isCompleted && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleMarkComplete}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Mark as Complete</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Progress</h3>
              
              <div className="space-y-3">
                {course.lessons.map((courseLesson, index) => {
                  const isCurrentLesson = courseLesson.id === lesson.id;
                  const isLessonCompleted = user?.completedLessons.includes(courseLesson.id);
                  
                  return (
                    <button
                      key={courseLesson.id}
                      onClick={() => handleNavigation(courseLesson)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        isCurrentLesson
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : isLessonCompleted
                          ? 'border-green-200 bg-green-50 text-green-900'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {isLessonCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : courseLesson.type === 'quiz' ? (
                            <div className="h-5 w-5 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">
                              Q
                            </div>
                          ) : (
                            <Play className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {index + 1}. {courseLesson.title}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {courseLesson.type} • {courseLesson.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                {previousLesson && (
                  <button
                    onClick={() => handleNavigation(previousLesson)}
                    className="w-full flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm">Previous lesson</span>
                  </button>
                )}
                {nextLesson && (
                  <button
                    onClick={() => handleNavigation(nextLesson)}
                    className="w-full flex items-center justify-between text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                  >
                    <span className="text-sm font-medium">Next: {nextLesson.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}