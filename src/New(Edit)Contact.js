import React, {Component} from 'react';
import {contactstore} from "./App";
import {db} from "./firestore";
import {Link} from "react-router-dom";

class NewContactForm extends Component{
    render() {
        function AddContact() {
            var newName =  document.getElementById("name").value;
            var newEmail = document.getElementById("email").value;
            db.collection("contacts").add({
                name: newName,
                email: newEmail
            })
                .then(function (docRef) {
                contactstore.addContacts(newName,newEmail,docRef.id);
            })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        }

        return (
            <div>
                <h4>My Address Book/New contact</h4>
                <div className={"main clear-fix"}>
                    <input id={"name"} defaultValue={"Name"}/>
                    <input id={"email"} defaultValue={"Email"}/>
                        <Link to={"/"}><button onClick={AddContact}>Ok</button></Link>
                        <Link to={"/"}><button>Cancel</button></Link>
                </div>
            </div>

        );
    }
}

class EditContactForm extends Component{
    render() {
        const {idx} = this.props.location.state;

        function onEdit() {
            contactstore.contacts[idx].name = document.getElementById("name").value;
            contactstore.contacts[idx].email = document.getElementById("email").value;
            db.collection("contacts").doc(contactstore.contacts[idx].docRefId).set({
                name: contactstore.contacts[idx].name,
                email: contactstore.contacts[idx].email
            }).catch(function (error) {
                console.error("Error editing document: ", error);
            });
        }

        return (
            <div>
                <h4>My Address Book/New contact</h4>
                <div className={"main clear-fix"}>
                    <input id={"name"} defaultValue={contactstore.contacts[idx].name}/>
                    <input id={"email"} defaultValue={contactstore.contacts[idx].email}/>
                        <Link to={"/"}><button onClick={onEdit}>Ok</button></Link>
                        <Link to={"/"}><button>Cancel</button></Link>
                </div>
            </div>

        );
    }
}


export {
    NewContactForm,
    EditContactForm
}
