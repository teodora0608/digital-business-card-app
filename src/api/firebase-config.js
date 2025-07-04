import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const analytics = getAnalytics(app);
export const auth = getAuth(app)