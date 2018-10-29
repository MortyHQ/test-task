import React, {Component} from 'react';
import {contactstore,Main} from "./App";
import {db} from "./firestore";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {observer} from "mobx-react";


const ClearFix = styled.div`
    &:before,&:after{
     content: " ";
     display: table;
     }
     &:after{
     clear: both;
     }
`;
const NameInput = styled.input`
    width: 400px;
    margin-bottom: 20px;
    margin-left: 90px;
    height: 10px;
    border: 1px solid;
    padding: 5px;
`;
const EmailInput = styled.input`
    width: 400px;
    margin-bottom: 30px;
    margin-left: 90px;
    height: 10px;
    border: 1px solid;
    padding: 5px;
`;
const Button = styled.button`
    background: ${props => props.ok ? "green" : "white"};
    color: ${props => props.ok ? "white" : "black"};
    border: ${props => props.cancel ? "1px solid" : "none"}
    padding: 10px;
    text-align: center;
    width: 100px;
    ${props => props.ok ? "margin-left: 10px" : "margin-right: 10px"};
    border-radius: 5px;
`;
const Buttons = styled.div`
    width: 220px;
    padding-left: 280px;
`;
const DeleteButton = styled.button`
    margin-left: 90px;
    float: left;
    padding: 10px;
    text-align: center;
    width: 100px;
    border-radius: 5px;
    background: red;
    color: white;
`;

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
            <Main>
                <h4>My Address Book/New contact</h4>
                <Main>
                    <ClearFix>
                        <NameInput id={"name"} defaultValue={"Name"}/>
                        <EmailInput id={"email"} defaultValue={"Email"}/>
                        <Buttons>
                            <Link to={"/test-task/"}><Button cancel>Cancel</Button></Link>
                            <Link to={"/test-task/"}><Button ok onClick={AddContact}>OK</Button></Link>
                        </Buttons>
                    </ClearFix>
                </Main>
            </Main>

        );
    }
}

const EditContactForm = observer(class EditContactForm extends Component{
    render() {
        const {idx} = this.props.location.state;
        const docRefId = contactstore.contacts[idx].docRefId;

        function deleteContact(idx) {
            contactstore.contacts.splice(idx, 1);
            db.collection("contacts").doc(docRefId).delete();
        }

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
        //TODO:Fix-bug-with-deleting
        return (
            <Main>
                <h4>My Address Book/Edit contact</h4>
                <Main>
                    <ClearFix>
                        <NameInput id={"name"} defaultValue={contactstore.contacts[idx].name}/>
                        <EmailInput id={"email"} defaultValue={contactstore.contacts[idx].email}/>
                        <Link to={"/test-task/"}><DeleteButton onClick={deleteContact}>Delete</DeleteButton></Link>
                        <Buttons>
                            <Link to={"/test-task/"}><Button cancel>Cancel</Button></Link>
                            <Link to={"/test-task/"}><Button ok onClick={onEdit}>Ok</Button></Link>
                        </Buttons>
                    </ClearFix>
                </Main>
            </Main>

        );
    }
});


export {
    NewContactForm,
    EditContactForm
}
