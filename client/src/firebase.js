// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-522a8.firebaseapp.com",
  projectId: "mern-blog-522a8",
  storageBucket: "mern-blog-522a8.appspot.com",
  messagingSenderId: "335506130713",
  appId: "1:335506130713:web:275edd695c9f76d20b2788"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);