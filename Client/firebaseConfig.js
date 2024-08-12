// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUk_A6EUV3bskmGe4G9LFO66R_JpuG_d0",
  authDomain: "atticaandroidapp.firebaseapp.com",
  projectId: "atticaandroidapp",
  storageBucket: "atticaandroidapp.appspot.com",
  messagingSenderId: "595324334337",
  appId: "1:595324334337:android:ac8947d21513f1464aeb00",
  // measurementId is optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth instance
const auth = getAuth(app);

export { auth ,firebaseConfig};


