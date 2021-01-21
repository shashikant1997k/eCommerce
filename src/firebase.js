import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyARDQBZe6febV1CkWAJuWi896ocnDVK27I",
  authDomain: "ecommerce-e3fc8.firebaseapp.com",
  projectId: "ecommerce-e3fc8",
  storageBucket: "ecommerce-e3fc8.appspot.com",
  messagingSenderId: "621928273736",
  appId: "1:621928273736:web:18de6c0aaf4fd4abec857d",
  measurementId: "G-T5K1N72ZD3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
