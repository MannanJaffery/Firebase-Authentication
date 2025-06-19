import Footer from "./footer";
import Navbar from "./navbar";
import { useState } from "react";
import { db } from "../firebase";

import { collection , addDoc } from "firebase/firestore";
import Errorlog from "../services/errorlog";


const Contact = () => {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [msg, setMsg] = useState('');



  const handlesubmit = async (e)=>{
    e.preventDefault();

    console.log(name , email , msg);


    try{
      await addDoc(collection(db ,"contactmsg") , {
        name: name,
        email : email,
        message: msg,
      });

      console.log("message sent successfully");

    }catch(err){
      Errorlog(err, "Contact.jsx")
      console.log(err);

    }

    setMsg('');
    setEmail('');
    setName('');

}


  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
          <form className="space-y-6" onSubmit={handlesubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name = "uname"
                  type="text"
                  value={name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  onChange={(e) =>setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                <input
                  name = "mail"
                  type="email"
                  value={email}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  onChange={(e) =>setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea

                name="msg"
                rows="5"
                value={msg}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
                onChange={(e) =>setMsg(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>
      </section>
      <Footer />



    </>
  )
}

export default Contact;
