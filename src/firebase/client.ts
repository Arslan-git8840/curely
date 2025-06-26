import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBWjSPE95GSe2SLHIBCr5RtvKTifbiZzgM",
  authDomain: "cureai-ed7fc.firebaseapp.com",
  projectId: "cureai-ed7fc",
  storageBucket: "cureai-ed7fc.firebasestorage.app",
  messagingSenderId: "145821346628",
  appId: "1:145821346628:web:1af364510810624ccc4511",
  measurementId: "G-FLS39Q485G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const firebaseAuth = getAuth(app);
export const firebaseDb = getFirestore(app);
