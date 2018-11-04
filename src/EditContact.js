import React,{Component} from "react";
import {contactstore, Main} from "./App";
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
    width: 80%;
    margin 10px auto;
    height: 10px;
    border: 1px solid;
    padding: 5px;
    outline: none;
`;
const EmailInput = styled.input`
    width: 80%;
    margin 10px auto 20px;
    height: 10px;
    border: 1px solid;
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
    @media (max-width: 720px){
      margin-left: ${props => props.ok ? "0":"10px"};
    }
`;
const Buttons = styled.div`
    margin-left:0;
    width: 100%
    @media (max-width: 720px){
      width: fit-content;
    }
`;
const DeleteButton = styled.button`
    padding: 10px;
    text-align: center;
    width: 100px;
    border-radius: 5px;
    background: red;
    color: white;
    cursor: pointer;
    margin-right:28%;
    @media (min-width: 721px),(max-width: 990){
      margin-right:15%;
    }
    @media (min-width: 991px),(max-width: 1279){
      margin-right:20%;
    }
    @media (min-width: 1280px),(max-width: 1959){
      margin-right:32%;
    }
    @media (max-width: 720px){
      margin-right:0;
    }
`;
const StyledLink = styled(Link)`
    cursor:default;
`;


class EditContactForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            email:true,
            name:true
        }
    }
    validateEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({
            email:regex.test(email)
        });
    }
    checkName(name) {
        var regex = /\S+/;
        this.setState({
            name:regex.test(name)
        });
    }

    render() {
        const idx = this.props.location.state.idx;


        return (
            <Main>
                <h4>My Address Book/Edit contact</h4>
                    <ClearFix>
                        <NameInput id={"name"} defaultValue={contactstore.contacts[idx].name} onInput={() => this.checkName(document.getElementById('name').value)}/>
                        <EmailInput id={"email"} defaultValue={contactstore.contacts[idx].email} onInput={() => this.validateEmail(document.getElementById('email').value)}/>
                        <Buttons>
                            <StyledLink to={"/test-task/"}><DeleteButton onClick={() => this.delete(idx)}>Delete</DeleteButton></StyledLink>
                            <StyledLink to={"/test-task/"}><Button cancel>Cancel</Button></StyledLink>
                            <StyledLink to={"/test-task/"}><Button ok onClick={() => this.onEdit(idx)} id={"OK"} disabled={!this.state.name || !this.state.email}>Ok</Button></StyledLink>
                        </Buttons>
                    </ClearFix>
            </Main>

        );
    }

    delete = (idx) => {
        db.collection("contacts").doc(contactstore.contacts[idx].docRefId).delete();
        contactstore.contacts.splice(idx, 1);
    };

    onEdit = (idx) => {
        contactstore.contacts[idx].name = document.getElementById("name").value;
        contactstore.contacts[idx].email = document.getElementById("email").value;
        db.collection("contacts").doc(contactstore.contacts[idx].docRefId).set({
            name: contactstore.contacts[idx].name,
            email: contactstore.contacts[idx].email
        }).catch(function (error) {
            console.error("Error editing document: ", error);
        });
    }
}

export default EditContactForm;