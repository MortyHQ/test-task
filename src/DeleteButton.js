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


@inject("contactsStore") class DeleteButton extends Component {
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