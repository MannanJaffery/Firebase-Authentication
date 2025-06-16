import { useParams } from "react-router-dom";
import { useCourse } from "../context/CourseProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";


const Category = () => {
  const {
    courses,
    subcourses,
    loading,
  } = useCourse();


  const navigate=useNavigate();

  const { catid } = useParams();

  if (loading) return <div className="p-10">Loading...</div>;

  // if (!selectedCourse) {
  //   setSelectedCourse(catid);
  // }
  console.log(courses);

  const selectedCourseObj = courses.find((course) => course.id == catid);

  const filteredSubCourses = subcourses.filter(
    (sub) => Number(sub.categoryId) === Number(selectedCourseObj.courseid)
  );


  return (

<div className="min-h-screen flex flex-col bg-gray-50">
  {/* Navbar */}
  <header className="shadow bg-white">
    <Navbar />
  </header>

  {/* Main Content */}
  <main className="flex-1 px-4 py-10 sm:px-8 flex flex-col items-center justify-start">
    <div className="w-full max-w-screen-md">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
        {selectedCourseObj?.title || "Course Not Found"}
      </h1>

      {filteredSubCourses.length === 0 ? (
        <p className="text-gray-600 text-center">No subcourses found for this category.</p>
      ) : (
        <ul className="space-y-4">
          {filteredSubCourses.map((sub) => (
            <li
              onClick={() =>
                navigate(
                  `/${encodeURIComponent(selectedCourseObj.title)}/${encodeURIComponent(sub.title)}`
                )
              }
              key={sub.id}
              className="bg-white border border-blue-100 hover:border-blue-400 p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-blue-800 font-medium hover:bg-blue-50"
            >
              {sub.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  </main>

  {/* Footer */}
  <footer className="bg-white shadow-inner mt-auto">
    <Footer />
  </footer>
</div>
    
  );
};

export default Category;
