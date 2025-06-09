import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

const loginwithcred= async (e)=>{
    e.preventDefault();

    try{
    const loggedinuser=await signInWithEmailAndPassword(auth,email,password);
    console.log('Logged in' , loggedinuser);
    }catch(err){
        console.log(err);
    }
}
  return (
    <>
        <h2>Login</h2>
        <form onSubmit={loginwithcred}>

            <input type="email" placeholder="email" onChange={(e)=>{
                setEmail(e.target.value);
            }} />
            <input type="password" placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value);
            }} />
            <button type="submit">Submit</button>

        </form>
    </>
  )
}

export default Login;
