import firebase from 'firebase/app';
import 'firebase/firestore';
import {contactstore} from "./App";

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

function EditContact(idx){
    contactstore.contacts[idx].name = document.getElementById("name").value;
    contactstore.contacts[idx].email = document.getElementById("email").value;
    db.collection("contacts").doc(contactstore.contacts[idx].docRefId).set({
        name: contactstore.contacts[idx].name,
        email: contactstore.contacts[idx].email
    }).catch(function (error) {
        console.error("Error editing document: ", error);
    });
}
function AddContact() {
    var newName =  document.getElementById("name").value;
    var newEmail = document.getElementById("email").value;
    db.collection("contacts").add({
        name: newName,
        email: newEmail
    })
        .catch(function(error) {
            console.log("Error adding document: ", error);
        });
}

function DeleteContact(idx,docRefId) {
    db.collection("contacts").doc(docRefId).delete();
    contactstore.contacts.splice(idx, 1);
}
export default db;
export {
    EditContact,
    DeleteContact,
    AddContact
}