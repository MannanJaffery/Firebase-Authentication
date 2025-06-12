import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";




const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  
  const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    alert("User Signed Out");

  } catch (error) {
    console.error("Sign out error:", error);
  }
};


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-white text-xl font-bold hover:text-gray-300 flex-shrink-0"
          >
            
            My App | <span>{user == null ? "Guest":"User" }</span>
          </Link>


          <div className="hidden md:flex items-center space-x-4">

            <Link
              to="/courses"
              className="text-white hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md"
            >
              Courses
            </Link>

            <Link
              to="/login"
              className="text-white hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md"
            >
              Register
            </Link>
            <Link
              to="/forgetpassword"
              className="text-white hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md"
            >
              Forget Password
            </Link>
            <Link
              to="/changepassword"
              className="text-white hover:text-blue-400 transition duration-300 ease-in-out px-3 py-2 rounded-md"
            >
              Change Password
            </Link>
            {user && <button
            onClick={handleSignOut}
            className="text-white hover:text-red-400 px-3 py-2 rounded-md"
>
            Sign Out
          </button>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-400 hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-400 hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Register
          </Link>
          <Link
            to="/forgetpassword"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-400 hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Forget Password
          </Link>
          <Link
            to="/changepassword"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-400 hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Change Password
          </Link>

          <Link
            to="/courses"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-400 hover:bg-gray-700"
            onClick={toggleMenu}
          >
            Courses
          </Link>

           {user && <button
            onClick={handleSignOut}
            className="text-white hover:text-red-400 px-3 py-2 rounded-md"
>
            Sign Out
          </button>}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;