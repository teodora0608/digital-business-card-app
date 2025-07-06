// src/api/profile.js
import { db }                     from "./firebase-config.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/**
 * Obține profilul utilizatorului din Firestore după UID
 * @param {string} uid - UID-ul utilizatorului
 * @returns {Promise<Object|null>} - Datele profilului sau null dacă nu există
 */
export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};

/**
 * Actualizează profilul utilizatorului în Firestore
 * @param {string} uid - UID-ul utilizatorului
 * @param {Object} updates - Obiect cu proprietățile de actualizat
 */
export const updateUserProfile = async (uid, updates) => {
  await updateDoc(doc(db, "users", uid), updates);
};
