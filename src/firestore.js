import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyCq3TKPzX7Tscb3iHFUYGi1VupDxemijeM",
    authDomain: "address-book-testtask.firebaseapp.com",
    databaseURL: "https://address-book-testtask.firebaseio.com",
    projectId: "address-book-testtask",
    storageBucket: "address-book-testtask.appspot.com",
    messagingSenderId: "1011142258800"
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export {
    db
};