import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "grox-67021",
  storageBucket: "grox-67021.appspot.com",
  messagingSenderId: "228724615685",
  appId: "1:228724615685:web:c4ebea6a576b9b30ae8a6c",
  measurementId: "G-0P2C352ECS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);