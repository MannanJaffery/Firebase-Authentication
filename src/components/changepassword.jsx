import { useState } from "react";
import {updatePassword,EmailAuthProvider,reauthenticateWithCredential} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import Errorlog from "../services/errorlog";

const Changepassword = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const navigate = useNavigate();

  const changepass = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("User must be logged in to change the password");
      navigate('/login');
      return;
    }

    try {
      // Use current password for reauthentication
      const credential = EmailAuthProvider.credential(user.email, currentPass);
      await reauthenticateWithCredential(user, credential);

      // Then update to the new password
      await updatePassword(user, newPass);
      alert("Password updated successfully!");
      navigate("/");
    } catch (err) {
      await Errorlog(err , "change password component");
      console.log("Error:", err.message);
      alert("Wrong current password entered");

    }
  };

  return (
    <>
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar className="w-full" />

    <div className="flex-1 flex items-center justify-center px-4">
      <form
        onSubmit={changepass}
        className="flex flex-col gap-4 w-11/12 max-w-md p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-800">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          onChange={(e) => setCurrentPass(e.target.value)}
          required
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPass(e.target.value)}
          required
          className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
        >
          Change Password
        </button>
      </form>
    </div>

    <Footer className="w-full" />
  </div>
</>

  );
};

export default Changepassword;
