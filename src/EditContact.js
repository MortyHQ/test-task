import React,{Component} from "react";
import {contactstore, Main} from "./App";
import {db} from "./firestore";
import {setupStarter} from "./FieldsCheck";
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


class EditContactForm extends Component {
    componentDidMount(){
        if(document.getElementById('email').value === "" || document.getElementById('name').value === ""){
            document.getElementById("OK").disabled = true;
            document.getElementById("OK").style = "background: none; border: 1px black solid; color: black;";
        }
    }

    render() {
        const idx = this.props.location.state.idx;


        return (
            <Main>
                <h4>My Address Book/Edit contact</h4>
                <Main>
                    <ClearFix>
                        <NameInput id={"name"} defaultValue={contactstore.contacts[idx].name}/>
                        <EmailInput id={"email"} defaultValue={contactstore.contacts[idx].email} onClick={setupStarter}/>
                        <Link to={{
                            pathname: "/test-task/",
                        }}><DeleteButton onClick={() => this.delete(idx)}>Delete</DeleteButton></Link>
                        <Buttons>
                            <Link to={"/test-task/"}><Button cancel>Cancel</Button></Link>
                            <Link to={"/test-task/"}><Button ok onClick={() => this.onEdit(idx)} id={"OK"}>Ok</Button></Link>
                        </Buttons>
                    </ClearFix>
                </Main>
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