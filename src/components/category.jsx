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

  <header className="shadow bg-white">
    <Navbar />
  </header>

<main className="flex-1 px-4 py-10 sm:px-8 flex flex-col items-center justify-start">
  <div className="w-full max-w-screen-xl mx-auto"> {/* ✅ This is the fix */}
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
      {selectedCourseObj?.title || "Course Not Found"}
    </h1>

    {filteredSubCourses.length === 0 ? (
      <p className="text-gray-600 text-center">No subcourses found for this category.</p>
    ) : (
      <>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
            {filteredSubCourses.map((sub) => (
              <div
                key={sub.id}
                className="bg-white h-[500px] rounded-md shadow-md max-w-sm mx-auto p-4 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={selectedCourseObj.imageurl}
                  alt="Not Loaded"
                  className="w-full h-72 object-cover border rounded-lg mt-2"
                />

                <div className="flex flex-col justify-between px-4 py-6">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-800">{sub.title}</h2>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {sub.level}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 min-h-[3.5rem]">{sub.short_desc}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                    <span>⏱️ {sub.duration}</span>
                    <button
                      className=" text-blue-900 hover:text-blue-800"
                      onClick={() => {
                        navigate(
                          `/${encodeURIComponent(selectedCourseObj.title)}/${encodeURIComponent(sub.title)}`
                        );
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
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
