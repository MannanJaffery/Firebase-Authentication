
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth , createUserWithEmailAndPassword } from 'firebase/auth';

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


const signUpUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};


export {db,auth,signUpUser};



