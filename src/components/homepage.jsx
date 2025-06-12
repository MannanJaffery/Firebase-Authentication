import { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { useAuth } from '../context/AuthContext';

import { doc ,setDoc , updateDoc} from 'firebase/firestore';
import { db  } from '../firebase';
import { arrayUnion } from 'firebase/firestore';

const Homepage = () => {
  // Sample course data
  const {user, loading} = useAuth();

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

  //const [selectedCourse, setSelectedCourse] = useState(null);

const handleSubmit = async (course) => {
  console.log("Submitting enrollment...");

  try {
    if (!user) {
      alert("Please log in to enroll.");
      return;
    }

    const userRef = doc(db, "User", user.uid);

    const courseData = {
      title: course.title,
      description: course.description,
      duration: course.duration,
      level: course.level,
      id: course.id
    };

    await updateDoc(userRef, {
      enrolledCourses: arrayUnion(courseData)
    });

    alert(`Successfully enrolled in ${course.title}`);
  } catch (err) {
    console.error("Error enrolling user in course:", err);
    alert("Failed to enroll. Please try again.");
  }
};



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
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" onClick={()=>{
                    
                    if(!user){
                      alert("User must be Logged in to Enroll.");
                    }else{
                    // setSelectedCourse(course);
                    handleSubmit(course);
                    console.log(course);
                 

                  }
                  }}>
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

{/* 
        {selectedCourse && user && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          type="button"
          onClick={() => setSelectedCourse(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Enroll in: {selectedCourse.title}</h2>
        <input
          name='sname'
          type="text"
          placeholder="Student Name"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <input
          type="text"
          name='roll'
          placeholder="Roll Number"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
      
    </div>
    
  )} */}

 
      </main>
      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
