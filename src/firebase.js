// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAP6EfTB6AAG_KCD6l-yLVIngo28Eo73B4",
    authDomain: "budget-management-2cdaa.firebaseapp.com",
    projectId: "budget-management-2cdaa",
    storageBucket: "budget-management-2cdaa.appspot.com",
    messagingSenderId: "32783617992",
    appId: "1:32783617992:web:8577552c599a1998113afd",
    measurementId: "G-G72SZYYH4E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
