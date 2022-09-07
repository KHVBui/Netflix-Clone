// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAyEo11vGsnufxnslQrWDlIB-Za4Ca0mpc",
	authDomain: "netflix-clone-f6a30.firebaseapp.com",
	databaseURL: "https://next-firebase-stripe-39bf8-default-rtdb.firebaseio.com",
	projectId: "netflix-clone-f6a30",
	storageBucket: "netflix-clone-f6a30.appspot.com",
	messagingSenderId: "202334876440",
	appId: "1:202334876440:web:c98fa53e95649a3d40646d",
	measurementId: "G-G33JY5XE41",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
