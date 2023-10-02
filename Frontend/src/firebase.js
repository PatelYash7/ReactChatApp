import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU5GYzoGJzuhJJkTrWzEhCl7WSpeq-bpU",
  authDomain: "reactchatapp-1217d.firebaseapp.com",
  projectId: "reactchatapp-1217d",
  storageBucket: "reactchatapp-1217d.appspot.com",
  messagingSenderId: "383677063662",
  appId: "1:383677063662:web:84755d052f7cd003cceeff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();