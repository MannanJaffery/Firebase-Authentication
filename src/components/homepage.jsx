import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useCourse } from '../context/CourseProvider';
import { useAuth } from '../context/AuthContext'; // assuming you're using AuthContext
import Navbar from './navbar';
import Footer from './footer';

const Homepage = () => {
  const {
    courses,
    subcourses,
    selectedCourse,
    setSelectedCourse,
    loading,
  } = useCourse();

  const { user } = useAuth(); // to access current user
  const navigate = useNavigate();

  if (loading) return <div className="p-10">Loading Courses...</div>;

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
        id: course.id,
      };

      await updateDoc(userRef, {
        enrolledCourses: arrayUnion(courseData),
      });

      alert(`Successfully enrolled in ${course.title}`);
    } catch (err) {
      console.error("Error enrolling user in course:", err);
      alert("Failed to enroll. Please try again.");
    }
  };

  const handleDetail = (course_id) => {
    setSelectedCourse(course_id);
  };

  // ✅ FIXED: Use string comparison, no Number()
  const filteredSubCourses = subcourses.filter(
    (sub) => sub.categoryId === selectedCourse
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Select the <span className="text-blue-600">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of courses to start your learning journey today.
          </p>
        </div>

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
                <p className="text-gray-600 mb-4 min-h-[3.5rem]">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>⏱️ {course.duration}</span>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      if (!user) {
                        alert("User must be Logged in to Enroll.");
                      } else {
                        handleSubmit(course);
                      }
                    }}
                  >
                    Enroll Now
                  </button>

                  <button
                    className="hover:text-blue-800"
                    onClick={() => {
                      
                      navigate(`/category/${course.id}`);
                      
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Subcategory Modal */}
      {selectedCourse && filteredSubCourses.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              Select a Subcategory
            </h3>
            <ul className="flex flex-col gap-3">
              {filteredSubCourses.map((sub) => (
                <li
                  key={sub.id}
                  className="cursor-pointer px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 transition text-center"
                  onClick={() => {
                    navigate(`/details/${sub.id}`);
                    setSelectedCourse(null);
                  }}
                >
                  {sub.title}
                </li>
              ))}
            </ul>
            <div className="text-center mt-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="mt-2 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Homepage;
