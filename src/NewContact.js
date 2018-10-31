import React, {Component} from 'react';
import {contactstore,Main} from "./App";
import {db} from "./firestore";
import {Link} from "react-router-dom";
import styled from "styled-components";



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


export {
    NewContactForm
}
