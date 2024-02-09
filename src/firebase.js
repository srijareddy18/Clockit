// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgsYnDEgLbBe8twz3d8sKgsDO4xBL1LGg",
    authDomain: "labgenie-c3554.firebaseapp.com",
    projectId: "labgenie-c3554",
    storageBucket: "labgenie-c3554.appspot.com",
    messagingSenderId: "44676574368",
    appId: "1:44676574368:web:89c3a47e9f8dc2d2a52dc5"
  };

// Initialize Firebase
export const fire_app = initializeApp(firebaseConfig);

// Firestore
export const fire_db = getFirestore(fire_app);
export const users_collection = collection(fire_db, "users");

// Initialize Firebase Authentication and get a reference to the service
export const fire_auth = getAuth(fire_app);
