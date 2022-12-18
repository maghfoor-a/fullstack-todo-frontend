import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyA_yz0ZPPL13NWo91Cyo0CsgChC1WBb8hA",
  authDomain: "get-stuff-done-9b1e8.firebaseapp.com",
  projectId: "get-stuff-done-9b1e8",
  storageBucket: "get-stuff-done-9b1e8.appspot.com",
  messagingSenderId: "986140288630",
  appId: "1:986140288630:web:5b4a1ff45e5ceee9c1e157",
  measurementId: "G-SC3M1X33WE",
};

//initialize firebase
export const app = initializeApp(firebaseConfig);

//initialize firebase authentication and get a reference to the service
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
