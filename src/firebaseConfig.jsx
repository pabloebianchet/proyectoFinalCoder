import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB0wmFcXdl41gz_jfKBOlpPB0zdLGefhfQ",
  authDomain: "tienda-af073.firebaseapp.com",
  projectId: "tienda-af073",
  storageBucket: "tienda-af073.appspot.com",
  messagingSenderId: "508840401116",
  appId: "1:508840401116:web:600e65abdc78d437743c19",
  measurementId: "G-FTH28WZG4V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
