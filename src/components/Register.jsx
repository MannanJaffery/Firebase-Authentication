import { useNavigate } from "react-router-dom";
import { signUpUser, createUserDocument } from "../firebase";
import Navbar from "./navbar";
import Footer from "./footer";


import { useState } from "react";
const Register=()=> {

const [email,setEmail]=useState('');
const [password , setPassword]=useState('');
const [name , setName]= useState('');


const navigate=useNavigate();
const handleNavigate=()=>{
  navigate("/");
}


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const usercredentials = await signUpUser(email, password, name);
    console.log('user created', usercredentials.user);
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      alert("This email is already registered. Please log in or use another email.");
    } else {
      console.error(err);
    }
  }
};

  return (
   <>
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar className="w-full" />

    <div className="flex-1 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-11/12 max-w-md p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-800">Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

                <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <button onClick={handleNavigate}
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>

    <Footer className="w-full" />
  </div>
</>

  )
}

export default Register;
