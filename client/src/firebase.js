// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "mern-auth-85c8a.firebaseapp.com",
    projectId: "mern-auth-85c8a",
    storageBucket: "mern-auth-85c8a.appspot.com",
    messagingSenderId: "900492611635",
    appId: "1:900492611635:web:7ccdb7652a93050bec9346"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);