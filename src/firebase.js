// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyN5j74fARqs7-zQ-3mJeCN4J6Pt0CGIw",
  authDomain: "globus-dev-9a199.firebaseapp.com",
  projectId: "globus-dev-9a199",
  storageBucket: "globus-dev-9a199.appspot.com",
  messagingSenderId: "116342946438",
  appId: "1:116342946438:web:c37a92cc53847857e1af07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
export const auth = getAuth(app);
