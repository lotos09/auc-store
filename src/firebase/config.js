import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzFNuZpZFmo00ODltBPhHPVDiiIC64GLE",
  authDomain: "auction-1459b.firebaseapp.com",
  databaseURL:
    "https://auction-1459b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auction-1459b",
  storageBucket: "auction-1459b.appspot.com",
  messagingSenderId: "692768848863",
  appId: "1:692768848863:web:e3a01dfbe362ea17d8a26a",
};

export const myBase = initializeApp(firebaseConfig);
