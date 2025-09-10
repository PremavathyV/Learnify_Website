import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Clock, BookOpen, Play, CheckCircle, Award, ArrowLeft } from 'lucide-react';
import { courses } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, enrollInCourse } = useAuth();

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
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

  const isEnrolled = user?.enrolledCourses.includes(course.id);
  const completedLessons = user?.completedLessons.filter(lessonId => 
    course.lessons.some(lesson => lesson.id === lessonId)
  ).length || 0;
  
  const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    enrollInCourse(course.id);
  };

  const handleStartLearning = () => {
    if (course.lessons.length > 0) {
      navigate(`/lesson/${course.id}/${course.lessons[0].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/courses')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to courses</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-gray-500" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Instructor</p>
                    <p className="text-gray-600">{course.instructor}</p>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="mb-8">
                    <ProgressBar progress={progress} />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-8 mt-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => {
                  const isCompleted = user?.completedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : lesson.type === 'quiz' ? (
                            <Award className="h-6 w-6 text-purple-500" />
                          ) : (
                            <Play className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {index + 1}. {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600 capitalize">
                            {lesson.type} • {lesson.duration}
                          </p>
                        </div>
                      </div>
                      {isEnrolled && (
                        <button
                          onClick={() => navigate(`/lesson/${course.id}/${lesson.id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          {isCompleted ? 'Review' : 'Start'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-8 sticky top-8"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${course.price}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">You're enrolled!</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartLearning}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200"
                  >
                    Continue Learning
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnroll}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200 mb-4"
                >
                  {user ? 'Enroll Now' : 'Sign in to Enroll'}
                </motion.button>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons:</span>
                  <span className="font-medium">{course.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certificate:</span>
                  <span className="font-medium">Yes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}