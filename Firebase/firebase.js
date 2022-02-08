import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS1-dlotPj-7Le88krTa35gjBKjtGbZlI",
  authDomain: "restaurant-app-82ffe.firebaseapp.com",
  projectId: "restaurant-app-82ffe",
  storageBucket: "restaurant-app-82ffe.appspot.com",
  messagingSenderId: "332533872024",
  appId: "1:332533872024:web:4fd34eb6cbd3305fef27ed",
  measurementId: "G-K2RM9085CB",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, db, storage, auth, provider };
