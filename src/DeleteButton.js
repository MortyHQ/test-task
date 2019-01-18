import React,{Component} from "react";
import {DeleteContact} from "./firestore";
import styled from "styled-components";
import {inject} from "mobx-react";

const Delete = styled.div`
    width: fit-content;
    position: relative;
    right: -95%;
    top: -27.5px;
`;
const DeleteBtn = styled.button`
    background: none;
    cursor: pointer;
`;

//TODO: button should not connect to any of the stores. remove contactsStore and simplify - DELETEBUTTON can be simple styled-component there

@inject("contactsStore") class DeleteButton extends Component {

    //TODO:
    render() {
        const {contactsStore, idx} = this.props;
        const docRefId = contactsStore.contacts[idx].docRefId;

        return (
            <Delete>
                <DeleteBtn onClick={() => DeleteContact(idx,docRefId)}>X</DeleteBtn>
            </Delete>
        );
    }
}
export default DeleteButton;