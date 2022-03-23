// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDPgD1k8-0iAPEr4uduAwk6pR7QTQys_w",
    authDomain: "linkdin-cl.firebaseapp.com",
    projectId: "linkdin-cl",
    storageBucket: "linkdin-cl.appspot.com",
    messagingSenderId: "884090702657",
    appId: "1:884090702657:web:78c9978ae6ed0701f86fc0"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
// const storage = "";
export { auth, provider, storage };
export default db;