import { useEffect, useState } from "react";

import Navbar from "./navbar";
import Footer from "./footer";
import { useParams } from "react-router-dom";
import { useCourse } from "../context/CourseProvider";




const Details = () => {

const {courseTitle} = useParams();


  const {
    subcourses,
    loading
  } = useCourse();



  const subcourse = subcourses.find((sub) => sub.title === courseTitle);

  console.log(subcourse);


 if (loading) return <div className="p-10">Loading subcourse...</div>;

  return (
   <>
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

 
    <main className="flex-1">
      <div className="max-w-3xl mx-auto p-6 flex flex-col gap-10 bg-white border rounded align-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{subcourse.title}</h1>
        <p className="text-gray-600 mb-6">{subcourse.description}</p>
        <p><strong>Duration:</strong> {subcourse.duration}</p>
        <p><strong>Level:</strong> {subcourse.level}</p>

      </div>
    </main>


    <div className="mt-auto">
      <Footer />
    </div>
  </div>
</>
  );
};

export default Details;
