// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCalBhHtUyBOrDQCzSx8H5kb4PjOD-i8sk",
  authDomain: "movie-buzz-9e879.firebaseapp.com",
  projectId: "movie-buzz-9e879",
  storageBucket: "movie-buzz-9e879.appspot.com",
  messagingSenderId: "745157837309",
  appId: "1:745157837309:web:a287ec64bb25033a8c5994",
  measurementId: "G-TF9FXKNDB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);