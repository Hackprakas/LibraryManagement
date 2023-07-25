import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjutfysFt3MbnLOmnWjDADgUuaTl6eYvo",
  authDomain: "librarymanagement-b2903.firebaseapp.com",
  projectId: "librarymanagement-b2903",
  storageBucket: "librarymanagement-b2903.appspot.com",
  messagingSenderId: "804758416568",
  appId: "1:804758416568:web:5b1cb051f0c9e1f15a584d"
};
export const firebasecon = firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
