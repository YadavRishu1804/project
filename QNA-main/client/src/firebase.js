// Import the firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvUEw6HEs8c9TfRtEuz70eZ-5yJbCzwvg",
  authDomain: "qna-ai.firebaseapp.com",
  projectId: "qna-ai",
  storageBucket: "qna-ai.appspot.com",
  messagingSenderId: "804249272893",
  appId: "1:804249272893:web:0a5f49dcb51e5da94f6054",
  measurementId: "G-4T64NYM9TG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  auth,
  db
};
