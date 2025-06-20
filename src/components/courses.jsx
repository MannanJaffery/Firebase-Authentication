import {  db } from "../firebase";
import { doc , getDoc , updateDoc ,arrayRemove } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

import Navbar from "./navbar";
import Footer from "./footer";
import Errorlog from "../services/errorlog";



import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const Courses = () => {


  const [userData, setUserData] = useState(null);
  const [editingCourseIndex, setEditingCourseIndex] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

const auth = getAuth();
const uid = auth.currentUser?.uid;
//for quill editor
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    [{ 'size': ['small',false ,  'large', 'huge'] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],

  ]
};

//for quill editor
const formats = [
  'header',
  'size',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'align',
  'color', 'background',
];


const handleDeleteCourse = async (course) => {
  try {
    console.log(userData);
    const userRef = doc(db, "User",uid); 
    await updateDoc(userRef, {
      enrolledCourses: arrayRemove(course)
    });



    const updatedCourses = userData.enrolledCourses.filter(
      (c) => c.title !== course.title
    );
    setUserData({ ...userData, enrolledCourses: updatedCourses });
  } catch (error) {
    await Errorlog(error , "courses.jsx");
    console.error("Error deleting course:", error);
  }
};



  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.log('No user is logged in');
        return;
      }

      try {
        const docRef = doc(db, 'User', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (

<div className="flex flex-col min-h-screen bg-gray-50">

  <header className="shadow-md bg-white">
    <Navbar className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
  </header>


  <main className="flex-grow p-6 max-w-7xl mx-auto w-full">



{editingCourseIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white shadow-lg rounded-md w-full max-w-xl p-6 border border-blue-200 mx-4">
      <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Edit Course</h3>

      <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
      <div className="mb-4 bg-white">

        <ReactQuill
          value={editForm.title}
          onChange={(value) => setEditForm({ ...editForm, title: value })}
          theme="snow"
          placeholder="Enter course title"
          className="bg-white"
          modules={modules}
          formats={formats}
        />
      </div>


      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
<div className="mb-4 bg-white">
  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
  
  <ReactQuill
    value={editForm.description}
    onChange={(value) => setEditForm({ ...editForm, description: value })}
    theme="snow"
    placeholder="Enter course description"
    className="custom-quill"
    modules={modules}
    formats={formats}
  />
</div>


      <div className="flex justify-end gap-3">
        <button
          onClick={async () => {
            const courseToUpdate = userData.enrolledCourses[editingCourseIndex];
            const updatedCourse = {
              ...courseToUpdate,
              title: editForm.title,
              description: editForm.description,
            };

            const updatedCourses = [...userData.enrolledCourses];
            updatedCourses[editingCourseIndex] = updatedCourse;

            const userRef = doc(db, "User", uid);
            await updateDoc(userRef, {
              enrolledCourses: updatedCourses,
            });

            setUserData({ ...userData, enrolledCourses: updatedCourses });
            setEditingCourseIndex(null);
            setEditForm({ title: "", description: "" });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={() => setEditingCourseIndex(null)}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}





    {userData ? (
      <>
        <h1 className="text-2xl font-bold mb-4 text-blue-800">
          Welcome, {userData.Name}
        </h1>
        <h2 className="text-xl mb-4 text-blue-700">Your Enrolled Courses:</h2>

        {userData.enrolledCourses?.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
             
              <table className="min-w-full divide-y divide-blue-200 bg-white">
                <thead className="bg-blue-800 text-white ">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Editing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {userData.enrolledCourses.map((course, index) => (
                    <tr key={index} className="hover:bg-blue-50">
                      <td className="px-6 py-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: course.title }}></td>
                      <td className="px-6 py-4 text-blue-700">{course.duration}</td>
                      <td className="px-6 py-4 text-blue-700">{course.level}</td>
                      <td className="px-6 py-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: course.description }}></td>
                      <td className="px-6 py-4">


                        <button
                        onClick={() => handleDeleteCourse(course)}
                        className="text-red-600 hover:underline text-sm"
                        >
                        Delete
                        </button>
                        <button
                            onClick={() => {
                                setEditingCourseIndex(index);
                                setEditForm({
                                title: course.title,
                                description: course.description,
                                });
                            }}
                            className="text-blue-600 hover:underline text-sm mr-2 ml-3"
                            >
                            Edit
                            </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {userData.enrolledCourses.map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 border border-blue-200">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.title }}></div>
                  <p className="text-sm text-blue-700">Duration: {course.duration}</p>
                  <p className="text-sm text-blue-700">Level: {course.level}</p>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.description }}></div>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="text-red-600 hover:underline text-sm"
                    >
                    Delete
                    </button>


                    <button
                            onClick={() => {
                                setEditingCourseIndex(index);
                                setEditForm({
                                title: course.title,
                                description: course.description,
                                });
                            }}
                            className="text-blue-600 hover:underline text-sm mr-2 ml-3"
                            >
                            Edit
                    </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-blue-600">You haven't enrolled in any courses yet.</p>
        )}
      </>
    ) : (
      <p className="text-gray-600">Loading user data...</p>
    )}

  </main>

  <footer className="bg-white shadow-inner mt-6">
    <Footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
  </footer>
</div>
  );
};

export default Courses;