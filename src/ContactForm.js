import React, {Component} from 'react';
import {Main} from "./App";
import {AddContact,DeleteContact, EditContact} from "./firestore";

import styled from "styled-components";
import {inject} from "mobx-react";
import withRouter from "react-router/es/withRouter";





const ClearFix = styled.div`
    &:before,&:after{
     content: " ";
     display: table;
     }
     &:after{
     clear: both;
     }
`;
const StyledInput = styled.input`
    font-size: 13.3333px;
    width: 97.98%;
    margin 10px auto ${props => props.email?"15px":""};
    height: 17.6px;
    border: 1px solid ${props => props.correct? "black" : "red"};
    padding: 5px;
    outline: none;
`;

const Button = styled.button`
    background: ${props => props.ok ? props => props.disabled ? "white" : "green": "white"};
    color: ${props => props.ok ? props => props.disabled ? "black" : "white" : "black"};
    border: ${props => props.cancel ? "1px solid" : props => props.disabled ? "1px solid" : "none"}
    
    text-align: center;
    width: 100px;
    height: 29.6px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
`;
const Buttons = styled.div`
    width: fit-content;
    margin-left:45%
    @media (max-width: 720px){
        margin-left:-4%;
    }
    @media (min-width: 1280px){
        margin-left:65%
    }
`;
const EditButtons = styled.div`
    margin-left:0;
    width: 100%
    @media (max-width: 720px){
      width: fit-content;
    }
`;
const DeleteButton = styled.button`
    text-align: center;
    width: 100px;
    height: 29.6px;
    border-radius: 5px;
    background: red;
    color: white;
    cursor: pointer;
    margin-right:28%;
    margin-top:10px;
    @media (min-width: 721px),(max-width: 990){
      margin-right:15%;
    }
    @media (min-width: 991px),(max-width: 1279){
      margin-right:20%;
    }
    @media (min-width: 1280px),(max-width: 1959){
      margin-right:50%;
    }
    @media (max-width: 720px){
      margin-right:0;
    }
`;

//TODO: EditContactForm and NewContactForm do the same functionality. unify this two components in one
@inject("contactsStore") @withRouter class EditContactForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            email:true,
            name:true,
            correctemail:true,
            correctname:true,
        }
    }
    validateEmail(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        const {idx,docRefId} = this.props.location.state;
        const {contactsStore,history} = this.props;


        return (
            <Main>
                <h4>My Address Book / Edit contact</h4>
                <ClearFix>
                    /*TODO: remove ids*/
                    <StyledInput id={"name"} defaultValue={contactsStore.contacts[idx].name} correct={this.state.correctname} onInput={(event) => this.checkName(event.target.value)}/>
                    <StyledInput id={"email"} defaultValue={contactsStore.contacts[idx].email} email correct={this.state.correctemail} onInput={() => this.validateEmail(document.getElementById('email').value)}/>
                    <EditButtons>
                        /*TODO: onClick handler code should not be in the render part - create handler function*/
                        <DeleteButton onClick={() => {DeleteContact(idx, docRefId).then(() => {history.push("/test-task")})}}>Delete</DeleteButton>
                        <Button cancel onClick={() => {history.push("/test-task")}}>Cancel</Button>
                        <Button ok onClick={() => EditContact(idx).then(() => history.push("/test-task"))} id={"OK"} disabled={!this.state.name || !this.state.email}>Ok</Button>
                    </EditButtons>
                </ClearFix>
            </Main>

        );
    }
}
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
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        const history = this.props.history;
        return (
            <Main >
                <h4>My Address Book / New contact</h4>
                    <ClearFix>
                        <StyledInput id={"name"} placeholder={"Name"} correct={this.state.correctname} onInput={() => this.checkName(document.getElementById('name').value)}/>
                        <StyledInput id={"email"} placeholder={"Email"} email correct={this.state.correctemail} onInput={() => this.validateEmail(document.getElementById('email').value)}/>
                        <Buttons id={"Buttons"}>
                            <Button cancel onClick={() => {history.push("/test-task")}}>Cancel</Button>
                            <Button ok onClick={() => AddContact().then(() => {history.push("/test-task")})} disabled={!this.state.name || !this.state.email} id={"OK"}>OK</Button>
                        </Buttons>
                    </ClearFix>
            </Main>

        );
    }
}



export {
    NewContactForm,
    EditContactForm
};
