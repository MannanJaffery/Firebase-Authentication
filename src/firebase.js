
import { initializeApp } from "firebase/app";

import { getAuth , createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore , doc , setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "fir-first-fe475.firebaseapp.com",
  projectId: "fir-first-fe475",
  storageBucket: "fir-first-fe475.firebasestorage.app",
  messagingSenderId: "321747949882",
  appId: "1:321747949882:web:1bdda00a91494c9796d803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);

//sign up is here , does not need any other file , more clean this way

export const createUserDocument = async (user, name,role) => {
  if (!user) return;

  const userRef = doc(db, "User", user.uid);
  await setDoc(userRef, {
    email: user.email,
    Name: name,
    role:role,
    enrolledCourses: []
  }, { merge: true });
};

const signUpUser = async (email, password, name,role) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await createUserDocument(user, name,role); 
  return userCredential;
};


export {db,auth,signUpUser};



