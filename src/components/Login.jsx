import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

import Errorlog from "../services/errorlog";



const Login = () => {
    const navigate = useNavigate();
    const handleroute = ()=>{
        navigate('/');
}

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

const loginwithcred= async (e)=>{
    e.preventDefault();

    try{
    const loggedinuser=await signInWithEmailAndPassword(auth,email,password);
    const user = loggedinuser.user;

    console.log('Logged in' , loggedinuser);
    //await createUserDocument(user);
    
    alert("User has logged in");
    }catch(err){
      await Errorlog(err, "login.jsx");
      console.log(err);
    }

}
  return (
    <>
    <div className="min-h-screen flex flex-col bg-gray-50">
  <Navbar className="w-full" /> {/* Add full width to Navbar */}

  <div className="flex-1 flex items-center justify-center px-4">
    <form
      onSubmit={loginwithcred}
      className="flex flex-col gap-4 w-11/12 max-w-md p-6 bg-gray-50 border-2 border-none rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-center text-blue-800">Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button onClick={handleroute}
        type="submit"
        className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Submit
      </button>


      
        <Link
              to="/forgetpassword"
              className="text-blue-800 hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md"
            >
              Forget Password
        </Link>


    </form>
  </div>

  <Footer className="w-full" /> {/* Add full width to Footer */}
</div>


    </>
  )
}

export default Login;
