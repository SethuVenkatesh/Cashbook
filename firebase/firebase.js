import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDCydp2IIR_SQE5K7iVL3rTKneqTssfc6I",
  authDomain: "cashbook-ca196.firebaseapp.com",
  projectId: "cashbook-ca196",
  storageBucket: "cashbook-ca196.appspot.com",
  messagingSenderId: "336665432310",
  appId: "1:336665432310:web:24deaa281bbbe1d717dcd7",
  measurementId: "G-X26Z2HLFEH"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth = getAuth();

