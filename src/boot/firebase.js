// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtSwoKbClvwGYCZYvwpZUl7u59IDsPVrQ",
  authDomain: "qwitter-76564.firebaseapp.com",
  projectId: "qwitter-76564",
  storageBucket: "qwitter-76564.appspot.com",
  messagingSenderId: "630045710288",
  appId: "1:630045710288:web:06079a91d7de988b7e0bd5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// export db variable to grant global access

export default db
