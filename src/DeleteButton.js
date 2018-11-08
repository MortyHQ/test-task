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


inject("store");
export default class DeleteButton extends Component {
    render() {
        const {store, idx} = this.props;
        const docRefId = store.contacts[idx].docRefId;



        return (
            <Delete>
                <DeleteBtn onClick={() => DeleteContact(idx,docRefId)}>X</DeleteBtn>
            </Delete>
        );
    }
}
