import { Navigate } from "react-router-dom";
import { signUpUser } from "./firebase";

import { useState } from "react";
const Register=()=> {
const [email,setEmail]=useState('');
const [password , setPassword]=useState('');


const handleSubmit = async (e)=>{
e.preventDefault();
try{
  const usercredentials=await signUpUser(email,password);
  console.log('user created' , usercredentials.user);

}catch(err){
  console.log(err);
}

}

  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e)=>{
          setEmail(e.target.value);
        }}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>{
          setPassword(e.target.value);
        }}/>

        <button type="submit">Submit</button>
        
      </form>
    </>
  )
}

export default Register;
