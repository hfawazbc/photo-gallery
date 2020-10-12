import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBBg6rkjAFnouSzn5jKwbBuePq7fvTCRo8",
    authDomain: "photo-gallery-fd50c.firebaseapp.com",
    databaseURL: "https://photo-gallery-fd50c.firebaseio.com",
    projectId: "photo-gallery-fd50c",
    storageBucket: "photo-gallery-fd50c.appspot.com",
    messagingSenderId: "861784858401",
    appId: "1:861784858401:web:17f586dab6a7e5b2d2e860",
    measurementId: "G-EZC39F94QV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const appStorage = firebase.storage();
export const appFirestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
