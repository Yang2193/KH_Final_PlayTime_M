// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANQTwjBD8DdZHXicOUpBX_cuPRZbOgcoA",
  authDomain: "playtime-833a9.firebaseapp.com",
  projectId: "playtime-833a9",
  storageBucket: "playtime-833a9.appspot.com",
  messagingSenderId: "838154561777",
  appId: "1:838154561777:web:cd1b23da69396d08636150",
  measurementId: "G-WTFYL8H8BD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();