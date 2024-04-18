// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage, getstore } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5MopPTwQa-QKXRr1mas7OdGR4g1uf-JU",
  authDomain: "jewish-library.firebaseapp.com",
  projectId: "jewish-library",
  storageBucket: "jewish-library.appspot.com",
  messagingSenderId: "1094083551371",
  appId: "1:1094083551371:web:53ade40f3848746747748e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getFirestore(app);
const storage=getStorage(app);
export{app,database,storage};
