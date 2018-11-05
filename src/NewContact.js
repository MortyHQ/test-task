import React, {Component} from 'react';
import {contactstore,Main} from "./App";
import db from "./firestore";
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
    width: 80%;
    margin 10px auto;
    height: 10px;
    border: 1px solid ${props => props.correct? "black" : "red"};
    padding: 5px;
    outline: none;
`;
const EmailInput = styled.input`
    width: 80%;
    margin 10px auto 20px;
    height: 10px;
    border: 1px solid ${props => props.correct? "black" : "red"};
    padding: 5px;
    outline: none;
`;
const Button = styled.button`
    background: ${props => props.ok ? props => props.disabled ? "white" : "green": "white"};
    color: ${props => props.ok ? props => props.disabled ? "black" : "white" : "black"};
    border: ${props => props.cancel ? "1px solid" : props => props.disabled ? "1px solid" : "none"}
    padding: 10px;
    text-align: center;
    width: 100px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
`;
const Buttons = styled.div`
    width: fit-content;
    margin-left:35%
    @media (max-width: 720px){
        margin-left:-4%;
    }
    @media (min-width: 1280px){
        margin-left:48%
    }
`;
const StyledLink = styled(Link)`
    cursor:default;
`;
let correct = {name: true, email: true};

class NewContactForm extends Component{

    constructor(props) {
        super(props);

        this.state={
            email:false,
            name:false,
            correctemail:true,
            correctname:true,
        }
    }
    validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email:regex.test(email),
            correctemail:regex.test(email)
        });
    }
    checkName(name) {
        var regex = /\S+/;
            this.setState({
            name:regex.test(name),
                correctname:regex.test(name)
        });
    }
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
                    console.log("Error adding document: ", error);
                });
        }

        return (
            <Main >
                <h4>My Address Book/New contact</h4>
                    <ClearFix>
                        <NameInput id={"name"} placeholder={"Name"} correct={this.state.correctname} onInput={() => this.checkName(document.getElementById('name').value)}/>
                        <EmailInput id={"email"} placeholder={"Email"} correct={this.state.correctemail} onInput={() => this.validateEmail(document.getElementById('email').value)}/>
                        <Buttons id={"Buttons"}>
                                <StyledLink to={"/test-task/"}><Button cancel>Cancel</Button></StyledLink>
                                <StyledLink to={"/test-task/"}><Button ok onClick={AddContact} disabled={!this.state.name || !this.state.email} id={"OK"}>OK</Button></StyledLink>
                        </Buttons>
                    </ClearFix>
            </Main>

        );
    }
}


export default NewContactForm;
