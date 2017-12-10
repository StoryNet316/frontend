import * as firebase from "firebase";
require("firebase/firestore")
// Initialize Firebase
const config = {
  apiKey: "AIzaSyDqshlzqz65hd51mRelSYdmZNcvQ1WrTQg",
  authDomain: "test-e285e.firebaseapp.com",
  databaseURL: "https://test-e285e.firebaseio.com",
  projectId: "test-e285e",
  storageBucket: "test-e285e.appspot.com",
  messagingSenderId: "71945885230"
};
firebase.initializeApp(config)

const database = firebase.firestore();

export default database;


export const bingKey = "bf70995a569a41f48f79b76df08690e4";