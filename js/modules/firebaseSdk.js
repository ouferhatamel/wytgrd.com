// Import the functions from the sdk
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5CRFwKomKp8tV87S6_3S83yQfcYvbdlw",
  authDomain: "williamturner-grading-2a059.firebaseapp.com",
  projectId: "williamturner-grading-2a059",
  storageBucket: "williamturner-grading-2a059.appspot.com",
  messagingSenderId: "546793748854",
  appId: "1:546793748854:web:39839f4a74f72f105a2257",
  measurementId: "G-0NW7SHMLVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Exporting variables and funtions
export {auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut};
///////////////////////////////////////////////////////////////////////////////////////
//Listen for auth status changes
