import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfF0Y3GSWghn5Yo-eEMcqKLM3dOrArUeI",
  authDomain: "gestion-hotelera-a3229.firebaseapp.com",
  projectId: "gestion-hotelera-a3229",
  storageBucket: "gestion-hotelera-a3229.firebasestorage.app",
  messagingSenderId: "62965489100",
  appId: "1:62965489100:web:c7b908205396d6be599169"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);