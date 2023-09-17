import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmgAjdtycjiSJuB4-pkcuIs0bcJyfsBoM",
    authDomain: "happy-tears-6e03c.firebaseapp.com",
    projectId: "happy-tears-6e03c",
    storageBucket: "happy-tears-6e03c.appspot.com",
    messagingSenderId: "680470357281",
    appId: "1:680470357281:web:1a42ee6d2a40e952744a60",
    measurementId: "G-4D9C1H4EGX"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();

  export {auth, fs, storage};