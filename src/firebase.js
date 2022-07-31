import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDB7A4R6DPZ29Wts3dU4Qytw0sk2GoTTk0",
  authDomain: "fb-messenger-redesign.firebaseapp.com",
  projectId: "fb-messenger-redesign",
  storageBucket: "fb-messenger-redesign.appspot.com",
  messagingSenderId: "1083982909711",
  appId: "1:1083982909711:web:ebe76d71a5341807e56e7a",
  measurementId: "G-R0YGPCBSSJ"
});

const db = firebaseApp.firestore();

export default db;
