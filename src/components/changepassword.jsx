import { useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    } catch (err) {
      console.log("Error:", err.message);
      alert(err.message);
    }
  };

  return (
    <>
    <div class="bg-black">
      <h1>Change Password</h1>
      <form onSubmit={changepass}>
        <input
          type="password"
          placeholder="Current Password"
          onChange={(e) => setCurrentPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>

      </div>
    </>
  );
};

export default Changepassword;
