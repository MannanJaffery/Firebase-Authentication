import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc,getDoc } from "firebase/firestore";
import Navbar from "./navbar";
import Footer from "./footer";
import { useParams } from "react-router-dom";



const Details = () => {

   const [subcourse , setSubCourse] = useState();

  
   const {subId} = useParams();


   useEffect(() => {
    const fetchsubCourse = async () => {
         try {
        const docRef = doc(db, "subCourse", subId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSubCourse(docSnap.data());
          console.log(subcourse);
        } else {
          console.log("No such subcourse!");
        }
      } catch (error) {
        console.error("Error fetching subcourse:", error);
      }
    };
  
    fetchsubCourse();
  }, [subId]);

 if (!subcourse) return <div className="p-10">Loading subcourse...</div>;

  return (
   <>
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    {/* Main content that will grow to fill space */}
    <main className="flex-1">
      <div className="max-w-3xl mx-auto p-6 flex flex-col gap-10 bg-white border rounded align-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{subcourse.title}</h1>
        <p className="text-gray-600 mb-6">{subcourse.description}</p>
        <p><strong>Duration:</strong> {subcourse.duration}</p>
        <p><strong>Level:</strong> {subcourse.level}</p>
        {/* Add more subcourse details here */}
      </div>
    </main>

    {/* Footer pushed to the bottom */}
    <div className="mt-auto">
      <Footer />
    </div>
  </div>
</>
  );
};

export default Details;
