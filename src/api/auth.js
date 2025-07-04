import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

// Înregistrare cu email și parolă
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login cu email și parolă
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Resetare parolă
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};