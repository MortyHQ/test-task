import firebase from 'firebase/app';
import 'firebase/firestore';
import {contactsStore} from "./App";

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
    contactsStore.contacts[idx].name = document.getElementById("name").value;
    contactsStore.contacts[idx].email = document.getElementById("email").value;
    return db.collection("contacts").doc(contactsStore.contacts[idx].docRefId).set({
        name: contactsStore.contacts[idx].name,
        email: contactsStore.contacts[idx].email
    }).then(()=> {
        return new Promise(resolve => {
            resolve();
        });
    },(error)=>{console.error("Error while editing document:" + error)});
}
function AddContact() {
    var newName =  document.getElementById("name").value;
    var newEmail = document.getElementById("email").value;
    return db.collection("contacts").add({
        name: newName,
        email: newEmail
    }).then(()=> {
        return new Promise(resolve => resolve())})
}

function DeleteContact(idx,docRefId) {
    return db.collection("contacts").doc(docRefId).delete().then(() => {
        contactsStore.contacts.splice(idx, 1);
        return new Promise((resolve => {
            resolve();
        }));
    });
}

function GetContacts() {
    contactsStore.contacts = [];
    db.collection("contacts").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           contactsStore.addContacts(doc.data().name,doc.data().email,doc.id)
        });
    });
}
export default db;
export {
    EditContact,
    DeleteContact,
    AddContact,
    GetContacts
}