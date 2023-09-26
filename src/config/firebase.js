// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmuUoHW7GemxPgiPVNkfUFNaXA0mBu5Ew",
  authDomain: "resturante-map-app.firebaseapp.com",
  projectId: "resturante-map-app",
  storageBucket: "resturante-map-app.appspot.com",
  messagingSenderId: "305605537961",
  appId: "1:305605537961:web:2efad30c8c98210b1f79b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();