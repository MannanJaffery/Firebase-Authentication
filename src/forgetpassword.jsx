

import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const ForgetPassword = () => {

    const [email , setEmail] = useState('');

    const handleresetpassword = async (e) =>{
        e.preventDefault();
        try{

        const resetpasswrod = sendPasswordResetEmail(auth , email);
        console.log(resetpasswrod);
        }
        catch(err){
            console.log(err);
        }
    }
    
  return (

<>
<h1>Forget Password</h1>

<form onSubmit={handleresetpassword}>

<input type="email" placeholder="email" required onChange={(e)=>{
    setEmail(e.target.value);
}}/>
<button type="submit">Forget Password</button>

</form>
</>

)
}

export default ForgetPassword;



