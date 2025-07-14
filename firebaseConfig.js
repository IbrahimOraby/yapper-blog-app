// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaqR6IlU_2zPNuSNcTL8NnqEmFqEPORZg",
  authDomain: "yapper-app-2174e.firebaseapp.com",
  projectId: "yapper-app-2174e",
  storageBucket: "yapper-app-2174e.firebasestorage.app",
  messagingSenderId: "704673449378",
  appId: "1:704673449378:web:df9b6fab68c6ffc26b1efb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
