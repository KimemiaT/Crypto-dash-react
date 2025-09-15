// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0-LdFy2_h6g1-zBCWbUX5WfA6pv1tQRU",
  authDomain: "cryto-currency-dashboard.firebaseapp.com",
  projectId: "cryto-currency-dashboard",
  storageBucket: "cryto-currency-dashboard.firebasestorage.app",
  messagingSenderId: "530398843685",
  appId: "1:530398843685:web:e76532bccb7a2994c280cc",
  measurementId: "G-2Y03MCLXQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export {app,auth}