// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6Ke1L--kmASXDXc7iIt9ceZTOqsEv8ro",
  authDomain: "netflixgpt-aa29b.firebaseapp.com",
  projectId: "netflixgpt-aa29b",
  storageBucket: "netflixgpt-aa29b.appspot.com",
  messagingSenderId: "1039067452769",
  appId: "1:1039067452769:web:cdd2294b8ec576c118e120",
  measurementId: "G-K1MJ0MBMBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
