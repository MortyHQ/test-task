import {inject, observer} from "mobx-react";
import {observable,action} from "mobx";
import React,{Component} from "react";
import styled from "styled-components";
import CreationButton from "./CreationButton";
import {Search} from "./Search";
import Table from "./Table";
import db from "./firestore";


const Main = styled.div`
    width: 50%;
    margin: 3% auto;
    > h4 {
        font: bold 22px 'Arial';
        margin-bottom: 10px;
        text-align: left;
    }
    @media (max-width: 720px){
        width: 250px
    }
    @media (min-width: 1280px){
        width: 640px
    }
`;


@inject("store") @observer class AddressBook extends Component {
    componentDidMount(){
        this.props.store.contacts = [];
        db.collection("contacts").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.props.store.addContacts(doc.data().name,doc.data().email,doc.id)
            });
        });
    }


    @observable
    lookingFor = "";

   @action lookFor = (value) => {
        this.lookingFor = value;

        this.props.store.searchResults = this.props.store.contacts.filter((contact) => {
            return contact.name.indexOf(this.lookingFor) > -1 || contact.email.indexOf(this.lookingFor) > -1
        });
    };


    render() {

        return (
            <Main>
                <h4>My Address Book</h4>
                <Search lookFor={this.lookFor}/>
                    <Table flag={this.lookingFor === ''}/>
                <CreationButton/>
            </Main>
        );
    }
}
export default AddressBook;