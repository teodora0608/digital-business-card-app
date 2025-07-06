import { auth, db }                        from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, setDoc }                     from "firebase/firestore";

// Înregistrare cu email, parolă și nume → Auth + Firestore
export const registerUser = async (email, password, name) => {
  // 1. Creezi user în Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid            = userCredential.user.uid;

  // 2. Creezi documentul minimal în Firestore
  await setDoc(doc(db, "users", uid), {
    uid,
    fullName: name || "",
    email
  });

  return userCredential;
};

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () =>
  signOut(auth);