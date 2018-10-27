import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {ObservableContactsStore} from "./ObservableContactsStore";
import './index.css';
import  {db} from "./firestore";

const contactstore = new ObservableContactsStore();
const searchstore = new ObservableContactsStore();

const CreationButton = observer(class CreationButton extends Component{
    render() {
        const store = this.props.store;
        function addNewContact() {
            var newName = prompt("Please enter contact name:", "Harry Potter");
            var newEmail = prompt("Please enter contact email:", "HarryPotter@hogwarts.com");
            db.collection("contacts").add({
                name: newName,
                email: newEmail
            }).then(function (docRef) {
                store.addContacts(newName,newEmail,docRef.id);
            })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

        }

        return (
            <div className={"creation"} onClick={addNewContact}>
                <h3> + </h3>
            </div>
        );
    }
});

const DeleteButton = observer(class DeleteButton extends Component{
    render() {
        const store = this.props.store;
        const idx = this.props.idx;
        const docRefId = store.contacts[idx].docRefId;
        function deleteContact(idx) {
            store.contacts.splice(idx,1);
            db.collection("contacts").doc(docRefId).delete();
        }

        return (
            <div className={"block del"}>
                <button className={"delete"} onClick={() => deleteContact(idx)}>X</button>
            </div>
        );
    }
});

const TableRow = observer(class TableRow extends Component{
    render() {
        const contact = this.props.contact;
        const store = this.props.store;
        const idx = this.props.idx;

        function onEdit(){
            store.contacts[idx].name = prompt("Please enter new contact name:", store.contacts[idx].name);
            store.contacts[idx].email = prompt("Please enter new contact email:", store.contacts[idx].email);
            db.collection("contacts").doc(store.contacts[idx].docRefId).set({
                name: store.contacts[idx].name,
                email: store.contacts[idx].email
            }).catch(function(error) {
                    console.error("Error editing document: ", error);
                });
        }

        return (
            <div className={"row clear-fix"}>
                <div className={"block"}>
                    <div>
                    <h5 className={"tooltip"} onClick={ () => onEdit()}>
                        {store.contacts[idx].name}
                        <span className={"tooltip-text"}> click to edit </span>
                    </h5>
                    </div>
                    <div>
                    <h6>{store.contacts[idx].email}</h6>
                    </div>
                </div>
                <DeleteButton store = {store} idx={idx}/>
            </div>
        );
    }
});

class Search extends Component{
    render() {
        const store = this.props.store;
        const result = this.props.result;

        /*function getFoundContact(value,index) {
            let contact = [value.name,value.email];
            return <TableRow contact = {contact} key = {index} store = {result} idx={index}/>;
        }*/

        return (
            <div className={"search-box clear-fix"}>
                <div className={"left"}>
                    &#9906;
                </div>
                <input type={"text"} className={"left"} onClick={setupStarter}/>
            </div>
        );
        function setupUpdater(){
            let input=document.getElementsByTagName('input')[0]
                , timeout=null;
            function handleChange(){
                result.contacts.splice(0,result.contacts.length);
                store.contacts.filter(value =>{
                   if ((value.name.indexOf(input.value) >= 0) || (value.email.indexOf(input.value) >= 0)){
                        result.addContacts(value.name,value.email,value.docRefId);
                    }
                })
            }
            function eventHandler(){
                if(timeout) clearTimeout(timeout);
                timeout = setTimeout(handleChange, 500);
            }
            input.onkeyup = eventHandler;
        }
        function setupStarter() {
            setupUpdater();
            document.getElementsByTagName('input')[0].focus();
        }
    }
}


const Table = observer(class Table extends Component{
    render() {
        const store = this.props.store;

        function getContact(value,index) {
            var contact = [value.name,value.email];
            return <TableRow contact = {contact} key = {index} store = {store} idx={index}/>;
        }

        return (
            <div className={'table'}>
                {store.contacts.map(getContact)}
                <CreationButton store = {store}/>
            </div>
        );
    }
});

class AddressBook extends Component {
    render() {
        return (
            <div className={"main"}>
                <h4>My Address Book</h4>
                <Search store = {contactstore} result = {searchstore}/>
                <Table store = {contactstore}/>
            </div>
        );
    }
}


ReactDOM.render( <AddressBook/>, document.getElementById('root'));


