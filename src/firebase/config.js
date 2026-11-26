// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ-19g8-1COg_pDIB3PTym7RSijFTaV3E",
  authDomain: "bruma-ecommerce-react.firebaseapp.com",
  projectId: "bruma-ecommerce-react",
  storageBucket: "bruma-ecommerce-react.firebasestorage.app",
  messagingSenderId: "931530724005",
  appId: "1:931530724005:web:40145fc37c3d02e5e9334c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

