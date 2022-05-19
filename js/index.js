// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

//Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

//Register users
const registerForm = document.getElementById('register__form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user infos
    const email = registerForm['email'].value;
    const pwd = registerForm['pwd'].value;

    //Register the user
    createUserWithEmailAndPassword(auth, email, pwd)
    .then((cred) => {
        console.log('User Created', cred.user);
        registerForm.reset();
    })
    .catch(err => {
        console.log(err.message);
    })
});

