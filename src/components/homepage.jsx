import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { useCourse } from '../context/CourseProvider';
import { useAuth } from '../context/AuthContext'; // assuming you're using AuthContext
import Navbar from './navbar';
import Footer from './footer';

import {Swiper , SwiperSlide} from 'swiper/react';
import {Navigation ,Pagination} from 'swiper/modules';
import Errorlog from '../services/errorlog';


const Homepage = () => {
  const {
    courses,
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
        image: course.imageurl,
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

      await Errorlog(err , "homepage.jsx");
      console.error("Error enrolling user in course:", err);

    }
  };

  
  return (
    // <div className="min-h-screen w-full bg-gray-50  ">
    <div
  className="min-h-screen w-full bg-grid bg-grid-pattern bg-gray-50"
>
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
  
        <Swiper
        modules={[Navigation , Pagination]}
        navigation
        pagination={{clickable:true}}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640:{slidesPerView:1},
          768:{slidesPerView:2},
          1024:{slidesPerView:3},
        }}>

        
          {courses.map((course) => (
            <SwiperSlide key={course.id} className='h-full w-auto'>

              <div className='bg-white h-[500px] rounded-md shadow-md max-w-sm mx-auto p-4 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg'>
              {/* These images were added to github , and are being loaded from there */}
              <img src={course.imageurl} alt="Not Loaded" className='w-full h-72 object-cover border rounded-lg mt-2'/> 
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 min-h-[3.5rem]">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>⏱️ {course.duration}</span>
                  
                  
                  {/* <button
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
                  </button> */}

                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      
                      navigate(`/category/${course.id}`);
                      
                    }}
                  >
                    Read More
                  </button>
                </div>
              </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    

      
      </main>



      <Footer />
    </div>
  );
};

export default Homepage;
