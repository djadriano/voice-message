import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGkxSyoJcaUQwRncsOH7trXVmhJfvD4mc',
  authDomain: 'message-after-the-beep.firebaseapp.com',
  databaseURL: 'https://message-after-the-beep.firebaseio.com',
  projectId: 'message-after-the-beep',
  storageBucket: 'message-after-the-beep.appspot.com',
  messagingSenderId: '696998549424',
  appId: '1:696998549424:web:1476f8ae7c76b98c10e875',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
