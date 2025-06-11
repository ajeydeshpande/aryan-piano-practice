// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQiz1d9aqjh9wLjtGHTUD_LtQqlBcXQiY",
  authDomain: "aryan-s-piano-practice.firebaseapp.com",
  projectId: "aryan-s-piano-practice",
  storageBucket: "aryan-s-piano-practice.firebasestorage.app",
  messagingSenderId: "963236030001",
  appId: "1:963236030001:web:6cbaa32453919f62211710",
  measurementId: "G-XZ8PNH9G7K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
