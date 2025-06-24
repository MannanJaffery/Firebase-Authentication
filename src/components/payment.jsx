import { useParams } from "react-router-dom";
import { useCourse } from "../context/CourseProvider";
import { useAuth } from "../context/AuthContext";
import Navbar from "./navbar";
import Footer from "./footer";
import {useStripe , useElements ,CardElement} from '@stripe/react-stripe-js'
import { useState } from "react";
import { useEffect } from "react";
import { updateDoc ,doc ,updateDoc} from "firebase/firestore";



const Payment = () => {

  const {subid} = useParams();
  const {
    subcourses,
  } = useCourse();


  const stripe = useStripe();
  const elements = useElements();


  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);




  const selected_subcourse = subcourses.find((sub)=>(sub.id===subid));
  const user = useAuth();

  
  useEffect(() => {
  if (selected_subcourse?.price) {
    fetch('https://firebase-authentication-production.up.railway.app/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: selected_subcourse.price * 100 })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(err=>{
        console.log("this is the error message from payment page, maybe somethibg wrong in backend");
      })
  }
}, [selected_subcourse]);


const handleEnroll = async (course) => {
    console.log("Submitting enrollment...");

    try {
      if (!user) {
        alert("Please log in to enroll.");
        return;
      }

      const userRef = doc(db, "User", user.uid);

      const courseData = {
        // image: course.imageurl,
        title: course.title,
        description: course.description,
        duration: course.duration,
        level: course.level,
        id: course.id,
        price: course.price,
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



const handleSubmit = async () => {

    if(!user){
      alert('user must be logged in to enroll')
    }

    if (!stripe || !elements) {
      alert('Stripe not loaded yet');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        await handleEnroll(selected_subcourse);
        console.log("Course enrolled");
        alert("✅ Payment successful!");

      }
    }
  };



  return (
      
    <>
  
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4">
    
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Course Payment</h2>

        
        <div className="space-y-1 border-b pb-4">
          <p className="text-lg font-medium text-gray-700">Course: <span className="text-blue-600">{selected_subcourse.title}</span></p>
          <p className="text-gray-600">Duration: {selected_subcourse.duration}</p>
          <p className="text-gray-600">Level: {selected_subcourse.level}</p>
        </div>

        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
        </div>

        
        <div className="border-t pt-4 flex justify-between text-lg font-semibold text-gray-800">
          <span>Total:</span>
          <span>{selected_subcourse.price} $</span>
        </div>
        {/* Stripe Card Input */}
        <div className="py-2">
          <label className="block text-sm text-gray-600 mb-1">Card Information</label>
          <div className="border p-3 rounded-md">
            <CardElement />
          </div>
        </div>


        
        <button className="w-full bg-blue-600 text-white py-3 rounded-md text-lg hover:bg-blue-700 transition cursor-pointer"
            onClick={handleSubmit}
            disabled={!stripe || !clientSecret}
        >
          Pay & Enroll Now
        </button>

        <p className="text-center text-sm text-gray-500 pt-2">🔒 100% Secure Payment with Stripe</p>
      </div>
      
    </div>
    <Footer/>
      </>
  );
};

export default Payment;


