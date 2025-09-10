import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, TrendingUp, Clock, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/mockData';
import ProgressBar from '../components/ProgressBar';
import CourseCard from '../components/CourseCard';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const enrolledCourses = courses.filter(course => 
    user.enrolledCourses.includes(course.id)
  );

  const totalLessons = enrolledCourses.reduce((acc, course) => acc + course.lessons.length, 0);
  const completedLessons = user.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const stats = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      label: 'Enrolled Courses',
      value: enrolledCourses.length,
      color: 'text-blue-600'
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      label: 'Completed Lessons',
      value: completedLessons,
      color: 'text-green-600'
    },
    {
      icon: <Award className="h-8 w-8" />,
      label: 'Certificates',
      value: enrolledCourses.filter(course => {
        const courseLessons = course.lessons.filter(lesson => 
          user.completedLessons.includes(lesson.id)
        );
        return courseLessons.length === course.lessons.length;
      }).length,
      color: 'text-purple-600'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      label: 'Overall Progress',
      value: `${Math.round(overallProgress)}%`,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Continue your learning journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {enrolledCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You haven't enrolled in any courses yet. Browse our extensive catalog 
              and find the perfect course to advance your skills.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-200"
            >
              Browse Courses
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Continue Learning Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
              
              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map((course) => {
                  const courseLessons = course.lessons.filter(lesson => 
                    user.completedLessons.includes(lesson.id)
                  );
                  const courseProgress = (courseLessons.length / course.lessons.length) * 100;
                  const nextLesson = course.lessons.find(lesson => 
                    !user.completedLessons.includes(lesson.id)
                  );

                  return (
                    <motion.div
                      key={course.id}
                      whileHover={{ scale: 1.01 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {course.title}
                            </h3>
                            <p className="text-gray-600">by {course.instructor}</p>
                          </div>
                        </div>
                        {nextLesson && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/lesson/${course.id}/${nextLesson.id}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                          >
                            <Play className="h-4 w-4" />
                            <span>Continue</span>
                          </motion.button>
                        )}
                      </div>
                      <ProgressBar progress={courseProgress} />
                      {nextLesson && (
                        <p className="text-sm text-gray-600 mt-2">
                          Next: {nextLesson.title}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* All Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/courses')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse more courses
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CourseCard
                      course={course}
                      onClick={() => navigate(`/course/${course.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}