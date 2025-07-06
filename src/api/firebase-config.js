import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCEBlbB1fmuSNjWxL1eFaq1jgnbInClsDI",
  authDomain: "digital-business-app.firebaseapp.com",
  projectId: "digital-business-app",
  storageBucket: "digital-business-app.firebasestorage.app",
  messagingSenderId: "1071422763393",
  appId: "1:1071422763393:web:d5949affc4f9a653eaf880",
  measurementId: "G-T9EL7Y042H"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =getFirestore(app);