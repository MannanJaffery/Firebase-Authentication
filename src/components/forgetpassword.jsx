

import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Errorlog from "../services/errorlog";

const ForgetPassword = () => {

    const [email , setEmail] = useState('');

    const handleresetpassword = async (e) =>{
        e.preventDefault();
        try{

        const resetpasswrod = sendPasswordResetEmail(auth , email);
        console.log(resetpasswrod);
        }
        catch(err){
          Errorlog(err , "foregetpassword.jsx");
            console.log(err);
        }
    }
    
  return (
<>
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar className="w-full" />

    <div className="flex-1 flex items-center justify-center px-4">
      <form
        onSubmit={handleresetpassword}
        className="flex flex-col gap-4 w-11/12 max-w-md p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-800">Forget Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>

    <Footer className="w-full" />
  </div>
</>



)
}

export default ForgetPassword;



