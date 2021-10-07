import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyB5ZQNg_Ryzty-6638GUppj5csHM1X9u_I",
    authDomain: "ludchess-d64d2.firebaseapp.com",
    projectId: "ludchess-d64d2",
    storageBucket: "ludchess-d64d2.appspot.com",
    messagingSenderId: "750432649876",
    appId: "1:750432649876:web:daf0d8cc1625d4f056aa81",
    measurementId: "G-W4BQKD3DBY"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);