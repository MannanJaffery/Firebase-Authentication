import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
const Homepage = () => {
  // Sample course data
  const courses = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn to build modern web applications with React and Node.js',
      duration: '8 weeks',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Data Science',
      description: 'Master Python for data analysis and machine learning',
      duration: '10 weeks',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build cross-platform apps with React Native',
      duration: '6 weeks',
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'UI/UX Design',
      description: 'Learn design principles and tools like Figma',
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'DevOps',
      description: 'CI/CD pipelines, Docker, and Kubernetes',
      duration: '8 weeks',
      level: 'Advanced'
    },
    {
      id: 6,
      title: 'Cybersecurity',
      description: 'Learn ethical hacking and security best practices',
      duration: '12 weeks',
      level: 'Intermediate'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Select the <span className="text-blue-600">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of courses to start your learning journey today.
          </p>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>⏱️ {course.duration}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
