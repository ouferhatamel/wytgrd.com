// Import the functions from the sdk
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,updatePassword,
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import{ 
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where
 } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

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
const db = getFirestore(app);

//Exporting variables and funtions
export {auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  db,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail };
///////////////////////////////////////////////////////////////////////////////////////
