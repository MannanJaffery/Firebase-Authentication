import { useEffect, useState } from "react";
import { db } from "../firebase";
import { query,getDocs ,collection ,orderBy } from "firebase/firestore";
import Navbar from "./navbar";
import Footer from "./footer";


const Details = () => {
   const [courses,setCourses]=useState([]);
   const [selectedcourse,setSelectedCourse]=useState(null);

   const [subcourses , setSubCourses] = useState([]);
   const [selectedsubcourse ,setSelectedSubCourse]= useState(null);

   useEffect(() => {
    const fetchCourses = async () => {
      try {
        const q1 = query(collection(db, "Courses"), orderBy("id"));
        const querySnapshot1 = await getDocs(q1);


        const q2=query(collection(db,"subCourse"), orderBy("categoryId"));
        const querySnapshot2=await getDocs(q2);

        const courseList = querySnapshot1.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const subcourseList = querySnapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      
        setCourses(courseList);
        setSubCourses(subcourseList);

      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  }, []);


  const handlecourse = (e)=>{
    setSelectedCourse(Number(e.target.value));
  }

  const handlesubcourse = (e)=>{
    setSelectedSubCourse(e.target.value);
  }


  const filteredSubCourses = subcourses.filter(
    (sub) =>sub.categoryId === Number(selectedcourse)
  );

  const selecteddata=subcourses.find((sub)=>sub.id==selectedsubcourse);
  console.log(selecteddata);
  return (
   <>
    <Navbar/>

  <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <form className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-blue-200 space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 text-center">Course Details</h2>
      <div className="text-left">
        <label htmlFor="category" className="block text-sm font-medium text-blue-800 mb-1">Course Category</label>
        <select
          name="category"
          id="category"
          onChange={handlecourse}
          className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Course">Select a Course</option>
          {courses.map((course) => (
            <option value={course.id} key={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      {selectedcourse && (
        <div className="text-left">
          <label className="block text-sm font-medium text-blue-800 mb-1">Sub Course</label>
          <select
            onChange={handlesubcourse}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Sub Course</option>
            {filteredSubCourses.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
    {selectedsubcourse && selecteddata && (
      <div className="mt-10 bg-white border border-blue-200 shadow-md rounded-xl p-6 w-full max-w-md text-blue-800 space-y-3">
        <h3 className="text-xl font-bold text-center">{selecteddata.title}</h3>
        <p><span className="font-semibold">Level:</span> {selecteddata.level}</p>
        <p><span className="font-semibold">Duration:</span> {selecteddata.duration}</p>
        <p><span className="font-semibold">Description:</span> {selecteddata.description}</p>
      </div>
    )}
  </div>
  <Footer />
   </>
  );
};

export default Details;
