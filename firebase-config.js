// ===========================================================
// PASTE YOUR OWN FIREBASE CONFIG HERE
// Get this from: Firebase Console > Project Settings > General
// > Your apps > Web app > SDK setup and configuration
// ===========================================================
const firebaseConfig = {
  apiKey: "AIzaSyB1-2lYs2M_-Vw731geOQ_HEzWceZdkSRw",
  authDomain: "wedding-dcab7.firebaseapp.com",
  databaseURL: "https://wedding-dcab7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-dcab7",
  storageBucket: "wedding-dcab7.firebasestorage.app",
  messagingSenderId: "907939998866",
  appId: "1:907939998866:web:bdaecd212898ca2b578a4b",
  measurementId: "G-9VNE5SDM9E"
};
// Do not edit below this line
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
