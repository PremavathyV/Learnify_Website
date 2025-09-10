import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Clock, BookOpen } from 'lucide-react';
import { Course } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const { user } = useAuth();
  const isEnrolled = user?.enrolledCourses.includes(course.id);

  const completedLessons = user?.completedLessons.filter(lessonId => 
    course.lessons.some(lesson => lesson.id === lessonId)
  ).length || 0;
  
  const progress = course.lessons.length > 0 ? (completedLessons / course.lessons.length) * 100 : 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden border border-gray-100"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold">
          ${course.price}
        </div>
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
          course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {course.level}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <img
              src={course.instructorAvatar}
              alt={course.instructor}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>
        </div>

        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{course.lessons.length} lessons</span>
          </div>
          {isEnrolled && (
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Enrolled
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}