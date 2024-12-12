
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEeGjOOBtyGFgrFSe8wvbUcjeqIPScCGM",
  authDomain: "scopebot-13dfe.firebaseapp.com",
  projectId: "scopebot-13dfe",
  storageBucket: "scopebot-13dfe.firebasestorage.app",
  messagingSenderId: "693010840327",
  appId: "1:693010840327:web:37ec6da02ac985241d23a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export{auth}