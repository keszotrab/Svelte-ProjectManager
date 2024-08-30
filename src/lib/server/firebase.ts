// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoRrB7DvLF6hq2WY4ituoNi-WdzWpfW2w",
  authDomain: "project-management-app-6aac9.firebaseapp.com",
  projectId: "project-management-app-6aac9",
  storageBucket: "project-management-app-6aac9.appspot.com",
  messagingSenderId: "305729872390",
  appId: "1:305729872390:web:600f7016f4031ee7d75987",
  measurementId: "G-NCSWHMHS53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);