import { useState , useEffect , createContext , useContext } from "react";
import { collection , getDocs , orderBy , query } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";



const CourseContext = createContext();

export const CourseProvider = ({children}) => {

    const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [subcourses, setSubcourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
  const fetchCourses = async () => {
    try {
      const q = query(collection(db, "Courses"), orderBy("courseid"));
      const querySnapshot = await getDocs(q);
      const q2 = query(collection(db, "subCourse"))
      const querySnapshot2 = await getDocs(q2);


      const courseList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        
        
      }));
      const subCoursesList = querySnapshot2.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
        
        

      }))
      setCourses(courseList);
      setSubcourses(subCoursesList);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  fetchCourses();
}, []);

 if (loading) return <div className="p-10">Loading Courses...</div>;


  return (
    <CourseContext.Provider
        value = {{
            courses,
            setCourses,
            subcourses,
            setSubcourses,
            selectedCourse,
            setSelectedCourse,
            loading,
        }}>
            {children}
    </CourseContext.Provider>
  )
}

export const useCourse = () => useContext(CourseContext);
